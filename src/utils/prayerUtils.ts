import type { PrayerTiming, PrayerWithStatus, NextPrayerInfo } from '../features/mosque/types'

/**
 * Parse "HH:MM" string into minutes since midnight.
 */
export function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

/**
 * Get current time in minutes since midnight.
 */
export function getNowInMinutes(now = new Date()): number {
  return now.getHours() * 60 + now.getMinutes()
}

/**
 * Annotates each prayer with its status relative to the current time.
 *
 * Rules:
 * - isOptional prayers (Sunrise) are always marked 'upcoming' (no jamaat window)
 * - A prayer is 'current' if now is between its azan and the next prayer's azan
 * - A prayer is 'past' if the next prayer has already started
 * - The first upcoming prayer after 'current' is marked 'next'
 * - All others are 'upcoming'
 *
 * @param prayers - Ordered array of daily prayer timings
 * @param now - Optional Date for testing/overrides
 */
export function annotatePrayerStatuses(
  prayers: PrayerTiming[],
  now = new Date()
): PrayerWithStatus[] {
  const nowMin = getNowInMinutes(now)
  const isFriday = now.getDay() === 5

  // Filter out optional prayers and handle Dhuhr/Jummah logic for window calculations
  const mainPrayers = prayers.filter((p) => {
    if (p.isOptional) return false
    if (isFriday && p.name === 'Dhuhr') return false
    if (!isFriday && p.name === 'Jummah') return false
    return true
  })

  // Find current prayer index among main prayers
  let currentIdx = -1
  for (let i = mainPrayers.length - 1; i >= 0; i--) {
    if (nowMin >= parseTimeToMinutes(mainPrayers[i].azan)) {
      currentIdx = i
      break
    }
  }

  // Map all prayers (including optional) with statuses
  let nextAssigned = false

  return prayers.map((prayer): PrayerWithStatus => {
    if (prayer.isOptional) {
      return { ...prayer, status: 'past' } // Sunrise is always informational
    }

    const isOmitted = (isFriday && prayer.name === 'Dhuhr') || (!isFriday && prayer.name === 'Jummah')

    // For omitted prayers, they should never be 'current' or 'next'.
    // They can be 'past' if their time has passed, or 'upcoming' otherwise.
    if (isOmitted) {
      const hasPassed = nowMin >= parseTimeToMinutes(prayer.azan)
      return { ...prayer, status: hasPassed ? 'past' : 'upcoming' }
    }

    const mainIdx = mainPrayers.findIndex((p) => p.name === prayer.name)

    if (mainIdx < currentIdx) {
      return { ...prayer, status: 'past' }
    }

    if (mainIdx === currentIdx) {
      return { ...prayer, status: 'current' }
    }

    // First prayer after current = next
    if (!nextAssigned) {
      nextAssigned = true
      return { ...prayer, status: 'next' }
    }

    return { ...prayer, status: 'upcoming' }
  })
}

/**
 * Returns the next prayer and how many minutes until it.
 * Returns null if all prayers have passed (post-Isha).
 */
export function getNextPrayer(
  prayers: PrayerTiming[],
  now = new Date()
): NextPrayerInfo | null {
  const nowMin = getNowInMinutes(now)
  const isFriday = now.getDay() === 5

  const mainPrayers = prayers.filter((p) => {
    if (p.isOptional) return false
    if (isFriday && p.name === 'Dhuhr') return false
    if (!isFriday && p.name === 'Jummah') return false
    return true
  })

  for (const prayer of mainPrayers) {
    const azanMin = parseTimeToMinutes(prayer.azan)
    if (azanMin > nowMin) {
      return {
        prayer,
        minutesUntil: azanMin - nowMin,
      }
    }
  }

  return null
}

/**
 * Formats minutes-until into a human-readable string.
 * e.g., 65 → "1h 5m", 45 → "45 min"
 */
export function formatCountdown(minutes: number): string {
  if (minutes < 60) return `in ${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `in ${h}h ${m}m` : `in ${h}h`
}

/**
 * Format a date for display header.
 */
export function formatDateHeader(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  })
}

/**
 * Formats "HH:MM" (24h) to "h:mm AM/PM"
 */
export function formatTimeTo12h(time: string | null): string {
  if (!time) return '—'
  const [h, m] = time.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  const mm = m.toString().padStart(2, '0')
  return `${h12}:${mm} ${ampm}`
}

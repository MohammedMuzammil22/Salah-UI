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

  // Filter out optional prayers for window calculations
  const mainPrayers = prayers.filter((p) => !p.isOptional)

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
  const mainPrayers = prayers.filter((p) => !p.isOptional)

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

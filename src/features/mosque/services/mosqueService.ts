import type { Mosque } from '../types'
import { MOCK_MOSQUE } from './mockData'

/**
 * Fetches today's Hijri date from the Ummah API.
 * Returns formatted string like "Dhu al-Qi'dah 6" or null on failure.
 */
async function fetchHijriDate(): Promise<string | null> {
  try {
    const res = await fetch('/api-hijri/api/today-hijri')
    if (!res.ok) return null
    const json = await res.json()
    if (!json.success || !json.data?.hijri) return null

    const { month_name, day } = json.data.hijri
    // Returns format like "Dhu al-Qi'dah 6" to match "Rabi' al-Thani 8"
    return `${month_name} ${day}`
  } catch (error) {
    console.error('Failed to fetch Hijri date:', error)
    return null
  }
}

/**
 * Simulates an async API fetch.
 * Replace with real HTTP call when backend is ready.
 *
 * @param id - Mosque identifier
 * @returns Mosque data or null if not found
 */
export async function getMosqueById(id: string): Promise<Mosque | null> {
  // Simulate network latency
  const [mosqueData, hijriDate] = await Promise.all([
    new Promise<Mosque | null>((r) => {
      setTimeout(() => {
        r(id === MOCK_MOSQUE.id ? structuredClone(MOCK_MOSQUE) : null)
      }, 600)
    }),
    fetchHijriDate()
  ])

  if (mosqueData && hijriDate && mosqueData.timings) {
    mosqueData.timings.islamicDate = hijriDate
  }

  return mosqueData
}

/**
 * Toggle favorite status for a mosque.
 * In production this would call PATCH /mosques/:id/favorite
 */
export async function toggleFavorite(_id: string, current: boolean): Promise<boolean> {
  await new Promise((r) => setTimeout(r, 200))
  return !current
}

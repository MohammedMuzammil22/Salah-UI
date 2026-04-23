import type { Mosque } from '../types'
import { MOCK_MOSQUE } from './mockData'

/**
 * Simulates an async API fetch.
 * Replace with real HTTP call when backend is ready.
 *
 * @param id - Mosque identifier
 * @returns Mosque data or null if not found
 */
export async function getMosqueById(id: string): Promise<Mosque | null> {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 600))

  if (id === MOCK_MOSQUE.id) return structuredClone(MOCK_MOSQUE)
  return null
}

/**
 * Toggle favorite status for a mosque.
 * In production this would call PATCH /mosques/:id/favorite
 */
export async function toggleFavorite(_id: string, current: boolean): Promise<boolean> {
  await new Promise((r) => setTimeout(r, 200))
  return !current
}

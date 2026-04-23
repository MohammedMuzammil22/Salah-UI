import { useState, useEffect, useCallback } from 'react'
import type { Mosque } from '../types'
import { getMosqueById, toggleFavorite } from '../services/mosqueService'

interface UseMosqueReturn {
  mosque: Mosque | null
  isLoading: boolean
  error: string | null
  toggleFav: () => Promise<void>
  refresh: () => void
}

export function useMosque(mosqueId: string): UseMosqueReturn {
  const [mosque, setMosque] = useState<Mosque | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    setError(null)

    getMosqueById(mosqueId)
      .then((data) => {
        if (!cancelled) {
          setMosque(data)
          setIsLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('Unable to load mosque data. Showing last known timings.')
          setIsLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [mosqueId, refreshKey])

  const toggleFav = useCallback(async () => {
    if (!mosque) return
    const next = await toggleFavorite(mosque.id, mosque.isFavorite)
    setMosque((prev) => prev ? { ...prev, isFavorite: next } : prev)
  }, [mosque])

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), [])

  return { mosque, isLoading, error, toggleFav, refresh }
}

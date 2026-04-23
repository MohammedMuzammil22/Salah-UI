import { useState, useEffect } from 'react'

/**
 * Returns a Date that updates every minute.
 * Used to drive live prayer status annotations without excessive re-renders.
 */
export function useLiveClock(): Date {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    // Sync to the next whole minute boundary for accuracy
    const msUntilNextMinute =
      60_000 - (Date.now() % 60_000)

    const timeout = setTimeout(() => {
      setNow(new Date())
      const interval = setInterval(() => setNow(new Date()), 60_000)
      return () => clearInterval(interval)
    }, msUntilNextMinute)

    return () => clearTimeout(timeout)
  }, [])

  return now
}

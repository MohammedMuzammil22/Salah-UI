import { useMosque } from '../features/mosque/hooks/useMosque'
import { useLiveClock } from '../hooks/useLiveClock'
import { annotatePrayerStatuses, getNextPrayer } from '../utils/prayerUtils'

import { Header } from '../components/layout/Header'
import { BottomNav } from '../components/layout/BottomNav'
import { MosqueHeader } from '../components/prayer/MosqueHeader'
import { NextPrayerCard } from '../components/prayer/NextPrayerCard'
import { PrayerTimingsList } from '../components/prayer/PrayerTimingsList'
import { LocationCard } from '../components/common/LocationCard'
import { FacilityChips } from '../components/common/FacilityChips'
import { EmptyTimings } from '../components/common/EmptyTimings'
import { MosquePageSkeleton } from '../components/common/Skeleton'

// In a real app, mosqueId would come from router params
const MOSQUE_ID = 'central-mosque-london'

export function MosquePage() {
  const { mosque, isLoading, error, toggleFav } = useMosque(MOSQUE_ID)
  const now = useLiveClock()

  if (isLoading) return <MosquePageSkeleton />

  if (!mosque) {
    return (
      <div className="flex items-center justify-center h-screen px-6 text-center">
        <div>
          <span className="material-symbols-outlined text-4xl text-error mb-3 block">error</span>
          <p className="font-headline font-bold text-on-surface mb-1">Mosque not found</p>
          <p className="font-label text-xs text-on-surface-variant">
            Please go back and try again.
          </p>
        </div>
      </div>
    )
  }

  const timings = mosque.timings
  const annotatedPrayers = timings
    ? annotatePrayerStatuses(timings.prayers, now)
    : null
  const nextPrayer = timings ? getNextPrayer(timings.prayers, now) : null

  return (
    <>
      <Header />

      <main className="pt-14 pb-28">
        {/* Banner for stale / offline data */}
        {error && (
          <div className="mx-6 mt-4 bg-error-container/60 rounded-xl px-4 py-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-error text-sm">wifi_off</span>
            <p className="font-label text-xs text-on-error-container">{error}</p>
          </div>
        )}

        {/* Hero section */}
        <section className="relative px-6 pt-7 pb-8 overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-primary-fixed/20 rounded-full blur-3xl -mr-28 -mt-14 pointer-events-none" />

          <MosqueHeader mosque={mosque} onToggleFavorite={toggleFav} />
          <NextPrayerCard info={nextPrayer} />
        </section>

        {/* Prayer timings */}
        <section className="px-6">
          {timings && annotatedPrayers ? (
            <PrayerTimingsList
              prayers={annotatedPrayers}
              date={timings.date}
              islamicDate={timings.islamicDate}
              lastUpdatedAt={timings.lastUpdatedAt}
            />
          ) : (
            <EmptyTimings mosqueName={mosque.name} />
          )}
        </section>

        {/* Location */}
        <section className="px-6 mt-7">
          <LocationCard location={mosque.location} />
        </section>

        {/* Facilities */}
        {mosque.facilities.length > 0 && (
          <section className="px-6 mt-7 mb-4">
            <FacilityChips facilities={mosque.facilities} />
          </section>
        )}
      </main>

      <BottomNav active="favorites" onChange={() => {}} />
    </>
  )
}

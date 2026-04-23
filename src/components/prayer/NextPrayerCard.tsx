import type { NextPrayerInfo } from '../../features/mosque/types'
import { formatCountdown } from '../../utils/prayerUtils'

interface NextPrayerCardProps {
  info: NextPrayerInfo | null
}

export function NextPrayerCard({ info }: NextPrayerCardProps) {
  if (!info) {
    return (
      <div className="mt-6 bg-surface-container rounded-xl p-5 text-center">
        <span className="material-symbols-outlined text-3xl text-on-surface-variant mb-2 block">
          bedtime
        </span>
        <p className="font-label text-sm text-on-surface-variant font-semibold">
          All prayers complete for today
        </p>
        <p className="font-label text-xs text-on-surface-variant/60 mt-1">
          Fajr tomorrow begins at dawn
        </p>
      </div>
    )
  }

  const { prayer, minutesUntil } = info

  return (
    <div className="mt-6 relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container rounded-xl opacity-10 scale-[1.015] -rotate-[0.5deg]" />

      <div className="relative bg-gradient-to-br from-primary to-primary-container rounded-xl p-5 text-on-primary flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="font-label text-[10px] uppercase tracking-[0.15em] text-on-primary-container block">
            Next Prayer
          </span>
          <h3 className="text-4xl font-extrabold tracking-tighter leading-none">
            {prayer.name}
          </h3>
          <p className="font-label text-sm opacity-75 italic pt-0.5">
            {formatCountdown(minutesUntil)}
          </p>
        </div>

        <div className="text-right">
          <div className="text-5xl font-extrabold tracking-tighter text-secondary-container leading-none">
            {prayer.azan}
          </div>
          {prayer.jamaat && (
            <span className="mt-1.5 inline-block text-[10px] font-label uppercase tracking-wider bg-white/10 px-3 py-0.5 rounded-full">
              Jamaat: {prayer.jamaat}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

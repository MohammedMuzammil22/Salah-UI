import type { PrayerWithStatus } from '../../features/mosque/types'
import { PrayerRow } from './PrayerRow'
import { formatDateHeader } from '../../utils/prayerUtils'

interface PrayerTimingsListProps {
  prayers: PrayerWithStatus[]
  date: string
  islamicDate: string
  lastUpdatedAt: string
}

export function PrayerTimingsList({
  prayers,
  date,
  islamicDate,
  lastUpdatedAt,
}: PrayerTimingsListProps) {
  const formattedDate = formatDateHeader(date)
  const updatedTime = new Date(lastUpdatedAt).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
      {/* Header Row */}
      <div className="px-5 pt-5 pb-3 flex justify-between items-center">
        <h4 className="font-headline font-bold text-base text-primary">{formattedDate}</h4>
        <span className="bg-secondary-fixed text-on-secondary-fixed-variant px-3 py-1 rounded-full font-label text-[11px] font-bold">
          {islamicDate}
        </span>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-[1.5fr_1fr_1fr] px-4 pb-2 border-b border-surface-container-low">
        {['Prayer', 'Azan', 'Jamaat'].map((col, i) => (
          <div
            key={col}
            className={`text-[10px] font-label font-extrabold uppercase tracking-widest text-on-surface-variant/50 ${
              i === 1 ? 'text-center' : i === 2 ? 'text-right' : ''
            }`}
          >
            {col}
          </div>
        ))}
      </div>

      {/* Prayer Rows */}
      <div className="px-3 py-1">
        {prayers.map((prayer) => (
          <PrayerRow key={prayer.name} prayer={prayer} />
        ))}
      </div>

      {/* Last Updated */}
      <div className="px-5 py-3 border-t border-surface-container-low">
        <p className="text-[10px] font-label text-on-surface-variant/40 text-right">
          Updated {updatedTime}
        </p>
      </div>
    </div>
  )
}

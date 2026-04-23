import type { PrayerWithStatus } from '../../features/mosque/types'
import { formatTimeTo12h } from '../../utils/prayerUtils'

interface PrayerRowProps {
  prayer: PrayerWithStatus
}

const STATUS_STYLES: Record<PrayerWithStatus['status'], string> = {
  past:     'opacity-40',
  current:  'bg-primary/5 ring-1 ring-primary/10 rounded-xl',
  next:     '',
  upcoming: '',
}

const ICON_STYLES: Record<PrayerWithStatus['status'], string> = {
  past:     'bg-surface-container-high text-on-surface-variant',
  current:  'bg-primary text-on-primary shadow-lg shadow-primary/20',
  next:     'bg-surface-container-high text-primary',
  upcoming: 'bg-surface-container-high text-on-surface-variant',
}

export function PrayerRow({ prayer }: PrayerRowProps) {
  const { name, azan, jamaat, icon, status, isOptional } = prayer
  const isCurrent = status === 'current'

  return (
    <div
      className={`
        grid grid-cols-[1.5fr_1fr_1fr] items-center py-3.5 px-2 transition-colors
        ${STATUS_STYLES[status]}
        ${!isCurrent && !isOptional ? 'border-b border-surface-container-low last:border-0' : ''}
        ${isOptional ? 'py-2' : ''}
      `}
      aria-current={isCurrent ? 'true' : undefined}
    >
      {/* Prayer Name + Icon */}
      <div className="flex items-center gap-3">
        <div
          className={`
            w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
            ${isOptional ? 'bg-transparent text-secondary' : ICON_STYLES[status]}
          `}
        >
          <span
            className="material-symbols-outlined text-lg"
            style={isCurrent ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            {icon}
          </span>
        </div>

        <p
          className={`
            font-headline font-bold
            ${isOptional ? 'text-sm text-on-surface-variant font-medium' : 'text-primary'}
          `}
        >
          {name}
        </p>
      </div>

      {/* Azan */}
      <div className="text-center">
        <p
          className={`
            font-headline font-semibold
            ${isOptional ? 'text-sm text-on-surface-variant' : 'text-on-surface-variant'}
          `}
        >
          {formatTimeTo12h(azan)}
        </p>
      </div>

      {/* Jamaat */}
      <div className="text-right">
        {jamaat ? (
          <>
            {isCurrent ? (
              <div className="flex items-center justify-end gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <p className="font-headline font-extrabold text-lg text-primary">{formatTimeTo12h(jamaat)}</p>
              </div>
            ) : (
              <p
                className={`
                  font-headline font-extrabold text-lg
                  ${isOptional ? 'text-sm text-on-surface-variant font-medium' : 'text-primary'}
                `}
              >
                {formatTimeTo12h(jamaat)}
              </p>
            )}
            {isCurrent && (
              <p className="text-[9px] font-label uppercase tracking-tight text-secondary font-bold">
                Now Active
              </p>
            )}
          </>
        ) : (
          <p className={`font-headline text-sm text-on-surface-variant/50 ${isOptional ? '' : 'font-semibold'}`}>
            —
          </p>
        )}
      </div>
    </div>
  )
}

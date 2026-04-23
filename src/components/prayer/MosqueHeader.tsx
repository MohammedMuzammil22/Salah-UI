import type { Mosque } from '../../features/mosque/types'

interface MosqueHeaderProps {
  mosque: Mosque
  onToggleFavorite: () => void
}

export function MosqueHeader({ mosque, onToggleFavorite }: MosqueHeaderProps) {
  const { name, location, isFavorite } = mosque

  return (
    <div className="flex justify-between items-start">
      <div className="max-w-[78%]">
        <h2 className="text-2xl font-extrabold tracking-tight text-primary leading-tight mb-1.5">
          {name}
        </h2>
        <p className="text-on-surface-variant font-label text-xs flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">location_on</span>
          {location.address}, {location.postcode}
        </p>
      </div>

      <button
        onClick={onToggleFavorite}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        className={`
          w-11 h-11 rounded-xl flex items-center justify-center shadow-sm transition-all active:scale-90
          ${isFavorite
            ? 'bg-error-container text-error'
            : 'bg-surface-container text-on-surface-variant'}
        `}
      >
        <span
          className="material-symbols-outlined text-xl"
          style={isFavorite ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          favorite
        </span>
      </button>
    </div>
  )
}

import type { Facility } from '../../features/mosque/types'

interface FacilityChipsProps {
  facilities: Facility[]
}

export function FacilityChips({ facilities }: FacilityChipsProps) {
  if (facilities.length === 0) return null

  return (
    <section>
      <h4 className="font-headline font-bold text-base text-primary mb-3">Facilities</h4>
      <div className="flex flex-wrap gap-2">
        {facilities.map((f) => (
          <div
            key={f.id}
            className="bg-surface-container-low border border-outline-variant/20 px-3 py-1.5 rounded-full flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm text-secondary">{f.icon}</span>
            <span className="font-label text-xs font-semibold text-on-surface">{f.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

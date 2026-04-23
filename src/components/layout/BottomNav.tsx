type NavTab = 'search' | 'favorites' | 'profile'

interface BottomNavProps {
  active: NavTab
  onChange: (tab: NavTab) => void
}

const NAV_ITEMS: { id: NavTab; icon: string; label: string }[] = [
  { id: 'search',    icon: 'search',    label: 'Search' },
  { id: 'favorites', icon: 'favorite',  label: 'Saved' },
  { id: 'profile',   icon: 'person',    label: 'Profile' },
]

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-4 bg-surface-container-lowest/90 backdrop-blur-2xl border-t border-outline-variant/20 rounded-t-2xl">
      {NAV_ITEMS.map(({ id, icon, label }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            aria-label={label}
            className={`
              flex flex-col items-center justify-center gap-0.5 px-5 py-1.5 rounded-2xl transition-all active:scale-90
              ${isActive
                ? 'text-primary bg-primary-fixed/40'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'}
            `}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {icon}
            </span>
            <span className="font-label text-[10px] font-bold uppercase tracking-widest">
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

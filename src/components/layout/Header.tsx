interface HeaderProps {
  onBack?: () => void
  onNotify?: () => void
  onShare?: () => void
}

export function Header({ onBack, onNotify, onShare }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 h-14 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20">
      <div className="flex items-center gap-2">
        <button
          onClick={onBack}
          aria-label="Go back"
          className="p-2 rounded-full hover:bg-surface-container transition-colors active:scale-95"
        >
          <span className="material-symbols-outlined text-primary text-xl">arrow_back</span>
        </button>
        <h1 className="font-headline font-extrabold text-base tracking-tight text-primary">
          Salah Times
        </h1>
      </div>

      <div className="flex items-center gap-1">
        <IconButton icon="notifications" label="Notifications" onClick={onNotify} />
        <IconButton icon="share" label="Share" onClick={onShare} />
      </div>
    </header>
  )
}

function IconButton({
  icon,
  label,
  onClick,
}: {
  icon: string
  label: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="p-2 rounded-full hover:bg-surface-container transition-colors active:scale-95"
    >
      <span className="material-symbols-outlined text-primary text-xl">{icon}</span>
    </button>
  )
}

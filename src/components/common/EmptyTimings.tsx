interface EmptyTimingsProps {
  mosqueName?: string
}

export function EmptyTimings({ mosqueName }: EmptyTimingsProps) {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm p-8 text-center">
      <span className="material-symbols-outlined text-4xl text-on-surface-variant/30 mb-3 block">
        schedule
      </span>
      <p className="font-headline font-bold text-on-surface text-sm mb-1">
        Timings not yet updated
      </p>
      <p className="font-label text-xs text-on-surface-variant leading-relaxed">
        {mosqueName
          ? `${mosqueName} has not published today's times yet.`
          : "Today's timings are not available."}
        <br />
        Check later or verify directly at the mosque.
      </p>
    </div>
  )
}

function Bone({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-surface-container-high rounded-lg animate-pulse ${className}`}
    />
  )
}

export function MosquePageSkeleton() {
  return (
    <div className="pt-14 pb-28 px-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="pt-8 space-y-2">
        <Bone className="h-7 w-3/4" />
        <Bone className="h-4 w-1/2" />
        {/* Next prayer card */}
        <Bone className="h-24 w-full mt-6 rounded-xl" />
      </div>

      {/* Prayer list */}
      <div className="bg-surface-container-lowest rounded-xl p-5 space-y-4 shadow-sm">
        <div className="flex justify-between">
          <Bone className="h-5 w-32" />
          <Bone className="h-5 w-24 rounded-full" />
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="grid grid-cols-[1.5fr_1fr_1fr] gap-2">
            <div className="flex items-center gap-2">
              <Bone className="w-8 h-8 rounded-full" />
              <Bone className="h-4 w-14" />
            </div>
            <Bone className="h-4 w-10 mx-auto" />
            <Bone className="h-4 w-12 ml-auto" />
          </div>
        ))}
      </div>

      {/* Location */}
      <Bone className="h-44 w-full rounded-xl" />

      {/* Facilities */}
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Bone key={i} className="h-8 w-28 rounded-full" />
        ))}
      </div>
    </div>
  )
}

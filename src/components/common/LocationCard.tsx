import type { MosqueLocation } from '../../features/mosque/types'

interface LocationCardProps {
  location: MosqueLocation
  onDirections?: () => void
}

export function LocationCard({ location, onDirections }: LocationCardProps) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`
  const fullAddress = `${location.postcode}, ${location.country}`

  const handleDirections = () => {
    if (onDirections) {
      onDirections()
    } else {
      window.open(mapsUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section>
      <h4 className="font-headline font-bold text-base text-primary mb-3">Location</h4>
      <div className="relative w-full h-44 rounded-xl overflow-hidden shadow-sm bg-surface-container">
        {/* Static map placeholder — swap for real map embed */}
        <div className="w-full h-full bg-gradient-to-br from-primary-fixed/30 to-surface-container-high flex items-center justify-center">
          <span className="material-symbols-outlined text-5xl text-primary/20">map</span>
        </div>

        {/* Address bar overlay */}
        <div className="absolute bottom-3 left-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm px-4 py-2.5 rounded-lg flex items-center justify-between gap-3">
          <p className="text-xs font-label text-on-surface font-semibold truncate">
            {fullAddress}
          </p>
          <button
            onClick={handleDirections}
            aria-label="Get directions"
            className="bg-primary text-on-primary p-1.5 rounded-lg flex-shrink-0 active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-sm">directions</span>
          </button>
        </div>
      </div>
    </section>
  )
}

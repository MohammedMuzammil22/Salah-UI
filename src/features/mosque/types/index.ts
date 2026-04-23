// ─── Prayer Types ────────────────────────────────────────────────────────────

export type PrayerName = 'Fajr' | 'Sunrise' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha'

export type PrayerStatus = 'past' | 'current' | 'next' | 'upcoming'

export interface PrayerTiming {
  name: PrayerName
  azan: string        // "HH:MM" 24h format
  jamaat: string | null  // null for Sunrise (no jamaat)
  icon: string        // Material Symbol name
  isOptional?: boolean  // e.g., Sunrise — no jamaat, decorative only
}

export interface DailyTimings {
  date: string            // ISO date string
  islamicDate: string     // e.g. "Rabi' al-Thani 8"
  prayers: PrayerTiming[]
  lastUpdatedAt: string   // ISO timestamp
}

// ─── Facility Types ───────────────────────────────────────────────────────────

export interface Facility {
  id: string
  label: string
  icon: string
}

// ─── Mosque Types ─────────────────────────────────────────────────────────────

export interface MosqueLocation {
  address: string
  city: string
  postcode: string
  country: string
  lat: number
  lng: number
}

export interface Mosque {
  id: string
  name: string
  location: MosqueLocation
  facilities: Facility[]
  timings: DailyTimings | null
  isFavorite: boolean
}

// ─── UI State ─────────────────────────────────────────────────────────────────

export interface PrayerWithStatus extends PrayerTiming {
  status: PrayerStatus
}

export interface NextPrayerInfo {
  prayer: PrayerTiming
  minutesUntil: number
}

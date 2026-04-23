import type { PrayerName } from '../features/mosque/types'

/** Display order for prayers — used to sort/validate data from APIs */
export const PRAYER_ORDER: PrayerName[] = [
  'Fajr',
  'Sunrise',
  'Dhuhr',
  'Jummah',
  'Asr',
  'Maghrib',
  'Isha',
]

/** Material Symbol icon for each prayer */
export const PRAYER_ICONS: Record<PrayerName, string> = {
  Fajr: 'wb_twilight',
  Sunrise: 'wb_sunny',
  Dhuhr: 'sunny',
  Jummah: 'groups',
  Asr: 'cloud_queue',
  Maghrib: 'nights_stay',
  Isha: 'bedtime',
}

/** Prayers that are informational only (no jamaat) */
export const OPTIONAL_PRAYERS: PrayerName[] = ['Sunrise']

/** Default mosque ID — replace with routing param in production */
export const DEFAULT_MOSQUE_ID = 'mohideen-masjid' //central-mosque-london

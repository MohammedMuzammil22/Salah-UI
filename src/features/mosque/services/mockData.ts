import type { Mosque } from '../types'

export const MOCK_MOSQUE: Mosque = {
  id: 'central-mosque-london',
  name: 'Central Mosque of London',
  isFavorite: true,
  location: {
    address: '146 Park Rd',
    city: 'London',
    postcode: 'NW8 7RG',
    country: 'United Kingdom',
    lat: 51.5282,
    lng: -0.1737,
  },
  facilities: [
    { id: 'wudu', label: 'Wudu Area', icon: 'wc' },
    { id: 'stepfree', label: 'Step-free Access', icon: 'accessible' },
    { id: 'sisters', label: "Sisters' Section", icon: 'groups' },
    { id: 'parking', label: 'Limited Parking', icon: 'local_parking' },
  ],
  timings: {
    date: new Date().toISOString().split('T')[0],
    islamicDate: "Rabi' al-Thani 8",
    lastUpdatedAt: new Date().toISOString(),
    prayers: [
      { name: 'Fajr',    azan: '05:12', jamaat: '05:45', icon: 'wb_twilight' },
      { name: 'Sunrise', azan: '07:24', jamaat: null,    icon: 'wb_sunny', isOptional: true },
      { name: 'Dhuhr',   azan: '12:54', jamaat: '13:15', icon: 'sunny' },
      { name: 'Asr',     azan: '15:42', jamaat: '16:00', icon: 'cloud_queue' },
      { name: 'Maghrib', azan: '17:58', jamaat: '18:05', icon: 'nights_stay' },
      { name: 'Isha',    azan: '19:20', jamaat: '20:30', icon: 'bedtime' },
    ],
  },
}

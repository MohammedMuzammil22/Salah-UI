import type { Mosque } from '../types'

export const MOCK_MOSQUE: Mosque = {
  id: 'mohideen-masjid',
  name: 'Mohideen Masjid',
  isFavorite: true,
  location: {
    address: '3, Bose St, Kodungaiyur (East), Krishnamoorthy Nagar, Kodungaiyur',
    city: 'Chennai',
    postcode: '600118',
    country: 'India',
    lat: 13.136057200000002,
    lng: 80.23968040000001,
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
      { name: 'Fajr', azan: '04:55', jamaat: '05:25', icon: 'wb_twilight' },
      { name: 'Sunrise', azan: '06:02', jamaat: null, icon: 'wb_sunny', isOptional: true },
      { name: 'Dhuhr', azan: '12:45', jamaat: '13:15', icon: 'sunny' },
      { name: 'Jummah', azan: '13:00', jamaat: '13:15', icon: 'groups' },
      { name: 'Asr', azan: '17:00', jamaat: '17:15', icon: 'cloud_queue' },
      { name: 'Maghrib', azan: '18:28', jamaat: '18:28', icon: 'nights_stay' },
      { name: 'Isha', azan: '20:00', jamaat: '20:15', icon: 'bedtime' },
    ],
  },
}

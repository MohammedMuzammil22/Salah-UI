# 🕌 Salah Times

A production-ready React + TypeScript app for displaying mosque prayer times.

## Tech Stack

- **React 18** with Vite
- **TypeScript** (strict mode)
- **Tailwind CSS** with custom design tokens
- **No UI libraries** — all components are custom-built

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
├── components/
│   ├── layout/          # Header, BottomNav
│   ├── prayer/          # MosqueHeader, NextPrayerCard, PrayerTimingsList, PrayerRow
│   └── common/          # FacilityChips, LocationCard, EmptyTimings, Skeleton
├── features/mosque/
│   ├── types/           # TypeScript interfaces
│   ├── services/        # mosqueService.ts + mockData.ts
│   └── hooks/           # useMosque data hook
├── hooks/               # useLiveClock (minute-tick)
├── pages/               # MosquePage (orchestrator)
├── utils/               # prayerUtils.ts (pure logic)
└── constants/           # prayers.ts
```

## Key Features

- **Live prayer status** — automatically highlights current/next/past prayers, updates every minute
- **Empty state** — graceful "timings not updated" message
- **Offline banner** — shows last-known data with error indicator
- **Loading skeleton** — pixel-matched to real layout
- **Backend-ready service layer** — swap mock for real API in one file

## Prayer Logic

All core logic lives in `src/utils/prayerUtils.ts`:

```ts
annotatePrayerStatuses(prayers, now)  // → past | current | next | upcoming
getNextPrayer(prayers, now)           // → { prayer, minutesUntil }
formatCountdown(45)                   // → "in 45 min"
```

## Connecting a Real Backend

Edit `src/features/mosque/services/mosqueService.ts`:

```ts
export async function getMosqueById(id: string): Promise<Mosque | null> {
  const res = await fetch(`/api/mosques/${id}`)
  if (!res.ok) return null
  return res.json()
}
```

No component changes needed.

## Adding Routes

Install `react-router-dom`, then update `src/App.tsx`:

```tsx
<Routes>
  <Route path="/" element={<SearchPage />} />
  <Route path="/mosque/:id" element={<MosquePage />} />
  <Route path="/profile" element={<ProfilePage />} />
</Routes>
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run type-check` | TypeScript check |
| `npm run lint` | ESLint |

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server (default port 5173).
- `npm run build` — production build to `dist/` (also runs the PWA service-worker precache generation via `vite-plugin-pwa`).
- `npm run preview` — serve the production build locally, for PWA/Lighthouse checks.
- `npm run lint` — Oxlint (the template's default linter; no ESLint config in this repo). No test runner is configured yet.
- No unit test suite exists yet — verification today is manual, via the dev server and the `?debugToday=YYYY-MM-DD` override described below.

### Testing dates without touching the system clock

In dev builds, append `?debugToday=YYYY-MM-DD` to the URL to override what the app treats as "today" (persisted in `sessionStorage` for the rest of the session, until cleared or a new `debugToday` param is passed). This is the intended way to exercise unlock/countdown/album logic — e.g. `http://localhost:5173/?debugToday=2027-02-14` to see the 1-year special day. See `getTodayLocalISO()` in `src/utils/date.js`.

### Connecting real data

The app needs `VITE_SHEETDB_API_URL` set in `.env.local` (gitignored, copy from `.env.example`) — a SheetDB endpoint over a Google Sheet with columns `data, dias_restantes, flor_id, nome_flor, significado, bilhete, foto_polaroid, legenda_polaroid, proxima_parada_foto, proxima_parada_local` (`data` column must be formatted as plain text in Sheets, or SheetDB dates will not stay in the required `YYYY-MM-DD` form; `foto_polaroid` is an optional image URL and `legenda_polaroid` an optional caption shown under it — empty rows just skip the Polaroid card / render it without a caption). Without it, the app renders a friendly `ErrorState` rather than crashing.

`proxima_parada_foto` (image URL) and `proxima_parada_local` (place name) drive the "Próxima Parada" 📍 card — unlike the per-day flower/bilhete/polaroid columns, this isn't daily content: it's a single "currently valid place" that gets overwritten in place on whichever row it's filled in on (by convention, the day-14 row of the current month) rather than requiring a new row/scheme each month. `getProximaParadaAtual` (`src/utils/proximaParada.js`, used via the `useProximaParada` hook) scans the date-sorted entry list and returns the most recent *unlocked* row that has both fields set, so the app always shows whatever place was most recently filled in, regardless of which row it lives on.

## Product overview

Read `prd.md` for the full spec. Summary: a personal PWA ("Diário Botânico do Amor") optimized for iPhone, giving the user's partner a daily illustrated flower with romantic meaning and a short love note ("bilhete"), plus an "Álbum" of past days organized by date. It's anchored to a one-year relationship countdown (2026-08-16 → 2027-02-14, 183 days total).

Key domain rules from the PRD (§6) to preserve in any implementation:
- A day's flower/note only unlocks once the system date reaches that day's date — no showing future content early.
- Countdown is `(dataFinal - dataAtual)` in days, always visible in the header.
- A pool of ~20–23 flower species repeats across the 183 days (color/tone varied for novelty) — flowers are not all unique.
- 2027-02-14 (the 1-year mark) gets an exclusive "golden/special" flower and distinct visual treatment.
- No punitive mechanics — no losable state, purely additive/affective.
- Content (notes/flowers) is added incrementally over time via the data source, not hardcoded, so the app must work with a partial dataset from day one.

## Architecture

- **Front-end:** React + Vite, plain CSS Modules (no Tailwind/styled-components) — global design tokens live in `src/styles/tokens.css`, shared utility classes in `src/styles/utilities.css`.
- **Routing (React Router):** `/` and `/album` are nested under `PageShell` (persistent Header + BottomNav); `/flor/:data`, `/bilhete/:data`, `/polaroid/:data`, and `/album/:data` are standalone full-screen detail routes (own `BackButton`, no bottom nav). See `src/App.jsx`.
- **Data flow:** `src/services/sheetdb.js` fetches and normalizes rows from SheetDB into `{date, diasRestantes, florId, nomeFlor, significado, bilhete, fotoPolaroid, legendaPolaroid, hasPolaroid, fotoProximaParada, nomeLocalProximaParada, hasProximaParada, hasContent}`. `DiarioProvider` (`src/context/DiarioContext.jsx`) fetches once, caches the result in `localStorage` for 12h (`src/services/cache.js`) to protect SheetDB's free-tier request quota, and exposes it via the `useDiario()` hook. Screens never call the service directly. The Polaroid card is independent of `hasContent` (flor+bilhete gate) — it's optional bonus content, gated only by `hasPolaroid` and simply omitted from Hoje when absent. The Próxima Parada card (`src/components/proximaParada/ProximaParadaCard.jsx`, route `/proxima-parada`) is likewise independent of `hasContent`, but also independent of *which day* it's on — see the "Connecting real data" section above.
- **Date/unlock logic is centralized in `src/utils/date.js`** — dates always travel as `YYYY-MM-DD` strings, and unlock/compare logic uses **string comparison**, never `new Date(isoString)` (which parses as UTC and causes off-by-one bugs in negative-offset timezones like Brazil's). Any new date handling should reuse `getTodayLocalISO`/`isUnlocked`/`diffInDaysISO`/`addDaysISO`, not hand-roll `Date` math.
- **The Álbum always renders exactly 183 virtual day-slots** (`src/utils/album.js`, `generateAlbumSlots`) regardless of how many rows exist in the spreadsheet — future dates are locked, past/present dates without a spreadsheet row yet show an "em preparação" state rather than an error. This is what lets content be filled in incrementally without breaking the UI.
- **The 2027-02-14 "golden day"** is detected by comparing a slot's date to `END_DATE` (`src/utils/constants.js`), never by array index — components already accept an `isSpecial`/`variant="dourado"` treatment end-to-end (`FlorCard`, `BilheteCard`, `BilheteEnvelope`, `AlbumDiaCard`) so wiring in the final Fase 7 art/copy shouldn't require touching routing or data logic.
- **Flower rendering:** `src/components/flor/FlorIllustration.jsx` looks for a matching file in `src/assets/flores/` via `import.meta.glob`; if none exists yet it falls back to `FlorPlaceholder` (a colored SVG shape), with color/meaning sourced from the local reference catalog in `src/utils/floresPool.js`. Dropping a real PNG/SVG named after a `flor_id` there is the entire integration step — no code change needed.
- **`localStorage` also tracks which days have been opened** (`src/hooks/useReadTracking.js`) purely as a cosmetic "already seen" checkmark in the Álbum — this must never gate unlocking, per the PRD's no-punitive-mechanics rule.
- **PWA:** configured via `vite-plugin-pwa` in `vite.config.js` (manifest, autoUpdate service worker). The SheetDB call is deliberately *not* cached by the service worker — the `localStorage` TTL cache already handles staleness, so a second caching layer there would just complicate debugging.
- **Fonts are self-hosted** (`public/fonts/quicksand-variable.woff2`, declared via `@font-face` in `src/styles/tokens.css`) — a single family (Quicksand) is used app-wide for both titles and body text, per the current design direction.
- **Placeholder assets still pending:** real flower PNGs (`src/assets/flores/README.txt`) and real app icons (currently a single placeholder SVG reused for all manifest icon sizes — fine for Android/Chrome, but Safari's `apple-touch-icon` really wants a PNG before real iOS device testing).
- **Hosting:** Vercel or Netlify; SPA fallback is already configured (`vercel.json` rewrite / `public/_redirects`) since routing is client-side.

## Visual style

"Wholesome Botanical / Cozy Flat 2D Hand-Drawn" — warm pastel palette (aged paper beige, mustard yellow, terracotta, olive green, burnt orange), flat 2D illustrations with soft rounded corners, stamp/sticker-style buttons, kraft-paper/field-journal texture. Reference aesthetics: *Puni the Florist*, *Tsuki's Odyssey*/*Boba Story*. Keep this in mind for any UI/CSS work — this is not a generic/utilitarian UI.

All user-facing content and copy is in Portuguese (pt-BR); keep new UI strings consistent with that.

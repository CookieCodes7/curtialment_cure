# SolarRevive — frontend prototype

A frontend-only, production-styled prototype of the SolarRevive platform: it
coordinates curtailed solar generation with nearby Flexible Load Consumers
(FLCs — irrigation pumps, cold storage, small industrial loads) so that
power that would otherwise be wasted gets used instead.

Three role-based dashboards (Plant developer, DISCOM / grid operator,
Farmer / FLC participant) all read from **one shared, in-memory event
store**, so a curtailment event simulated from the DISCOM screen is visible
live on the Plant and Farmer screens too — no page refresh needed.

## 1. Project structure

```
src/
├── api/            service-layer functions components call (auth, plants,
│                   flcs, events, settlements, simulation) — swap the body
│                   of these for real fetch() calls to FastAPI later
├── services/       pure logic: matchingEngine, sensorSimulation,
│                   settlementEngine, eventStore (shared cross-dashboard state)
├── data/           mock seed data (plants, FLCs, historical events...)
├── context/        AuthContext (mock session)
├── lib/            useEventStore hook (useSyncExternalStore over the store)
├── components/     shared UI: layouts, KpiCard, StatusBadge, MatchingPanel...
└── pages/
    ├── Landing.jsx, Login.jsx
    ├── plant/      6 pages
    ├── discom/     5 pages
    └── farmer/     5 pages
```

## 2. Installation

```bash
npm install
```

## 3. Run locally

```bash
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

Production build: `npm run build` (outputs to `dist/`). Preview that build
with `npm run preview`.

## 4. Demo credentials

| Role | Email | Password |
|---|---|---|
| Plant developer | `plant@SolarRevive.demo` | `password123` |
| DISCOM / grid operator | `discom@SolarRevive.demo` | `password123` |
| Farmer / FLC | `farmer@SolarRevive.demo` | `password123` |

The login screen also pre-fills these so you can just press "Log in".

## 5. The demo story (what to actually click during a presentation)

1. Log in as **DISCOM**. Open **Simulation**.
2. Pick a plant, e.g. 50 kW required, 30 min duration. **Start simulation.**
3. Watch the 8-step tracker and the live log animate through detection ->
   matching -> dispatch -> activation -> verification -> settlement (~7-8
   seconds total). The matching panel shows exactly which FLCs were
   selected and why (capacity 70% / distance 30% scoring).
4. Log out, log in as **Plant developer** (`plant@SolarRevive.demo`). The
   dashboard's KPIs and event table already reflect the event you just ran.
5. Log out, log in as **Farmer** (`farmer@SolarRevive.demo`, FLC-001). If
   FLC-001 was one of the ones selected, the pump status card shows
   "Active"/history and earnings update automatically.

All three logins can also be kept open in separate browser tabs
simultaneously — the shared store means all three update live without any
tab needing a refresh.

## 6. Architecture notes

- **Cross-dashboard state** (`src/services/eventStore.js`): a plain module
  with a subscribe/getSnapshot pair, wired into React via
  `useSyncExternalStore` (`src/lib/useEventStore.js`). Any component that
  calls `useEventStore()` re-renders whenever the store changes -- this is
  what makes the three role dashboards feel like one system instead of
  three unrelated pages.
- **Simulation orchestrator** (`src/api/simulation.js`): the only place
  that knows the full event state machine
  (`DETECTED -> MATCHING -> MATCHED -> DISPATCHING -> ACTIVE -> VERIFYING ->
  COMPLETED -> SETTLED`). It calls the matching engine, sensor simulator,
  and settlement engine in sequence, writing each step to the shared store
  with small delays so the UI can animate through it.
- **Matching engine** (`src/services/matchingEngine.js`): scores each
  available FLC as `0.7 x capacity_score + 0.3 x distance_score`, ranks
  them, and greedily allocates capacity until the requirement is met. This
  is explicitly labelled in the UI as a *prototype matching policy*, not an
  official rule.
- **Rates** (`src/data/mockData.js` -> `RATE_PER_KWH`): a single configurable
  constant. Also explicitly labelled as a demo rate, not a finalised
  tariff, everywhere it's shown.

## 7. Where the FastAPI backend plugs in

Every file under `src/api/` is the seam. Each currently does
`await new Promise(r => setTimeout(r, ...))` plus a read from
`src/data/mockData.js` or a write to `src/services/eventStore.js`. To go
live:

1. Replace the body of each `src/api/*.js` function with a `fetch()` call
   to the matching FastAPI route (suggested contract: `POST /events`,
   `POST /events/:id/match`, `POST /events/:id/dispatch`,
   `GET /flcs`, `GET /settlements`, ...).
2. Replace `src/services/eventStore.js`'s in-memory object with a thin
   WebSocket client that updates the same `state` shape on incoming
   messages -- because components only ever read via `useEventStore()`,
   **no page or component needs to change** when you do this.
3. `src/api/auth.js`'s `localStorage` session becomes a real JWT/session
   cookie exchange.

## 8. Implemented routes

```
/                       /login/:role

/plant/dashboard        /plant/events            /plant/events/:id
/plant/energy           /plant/settlements        /plant/reports
/plant/settings

/discom/dashboard       /discom/events            /discom/flexibility
/discom/simulation      /discom/settings

/farmer/dashboard       /farmer/activity          /farmer/earnings
/farmer/notifications   /farmer/profile
```

## 9. Mock services (src/api/)

`auth.js` - `plants.js` - `flcs.js` - `events.js` - `settlements.js` -
`simulation.js`

## 10. Assumptions & scope notes

- All figures (revenue, tariff, historical events, FLC roster) are
  illustrative demo data, clearly not claimed as real production numbers
  anywhere in the UI copy.
- The network map on `/discom/flexibility` is explicitly labelled
  "schematic -- not geographically accurate", per the brief.
- `/plant/settings` and `/discom/settings` are intentionally minimal
  (read-only account info) since the brief's main interaction surface is
  the dashboards, events, and simulation flow, not account admin.
- Communication accessibility (SMS / IVR toggles, no smartphone required)
  is implemented on the Farmer -> Notifications page.
- Tailwind v4 is used (CSS-first `@theme` config in `src/index.css`, no
  `tailwind.config.js`) -- if your tooling expects v3, the token names are
  all in one place and easy to port.

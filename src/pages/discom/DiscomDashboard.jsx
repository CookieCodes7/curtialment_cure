import { Link } from 'react-router-dom'

import { useEventStore } from '../../lib/useEventStore.js'

import { HISTORICAL_EVENTS } from '../../data/mockData.js'

import KpiCard from '../../components/KpiCard.jsx'

import StatusBadge from '../../components/StatusBadge.jsx'

import {
  Zap,
  ArrowRight,
  UserPlus,
  Network,
  Activity,
  Clock,
  Gauge,
  Radio,
} from 'lucide-react'


/*
 * DEMO ACTIVE CURTAILMENT EVENT
 *
 * This keeps the Operations dashboard populated even before
 * the user runs an event from the Simulation page.
 *
 * Clearly marked as DEMO data — not live grid data.
 */
const DEMO_ACTIVE_EVENT = {
  id: 'DEMO-EVENT-001',
  plant: 'Pugal Solar Plant',
  location: 'Bikaner, Rajasthan',
  status: 'ACTIVE',
  requiredKw: 50,
  matchedKw: 50,
  durationMinutes: 30,
  elapsedMinutes: 18,
  remainingMinutes: 12,
  activeFlcs: 6,
  recoveredEnergyKwh: 15,
}


export default function DiscomDashboard() {
  const { flcs, liveEvents } = useEventStore()


  const availableFlcs =
    flcs.filter(
      (f) => f.status === 'available'
    )


  const activeFlcs =
    flcs.filter(
      (f) => f.status === 'active'
    )


  const availableMw =
    +(
      availableFlcs.reduce(
        (a, f) => a + f.capacityKw,
        0
      ) / 1000
    ).toFixed(2)


  const utilizedMw =
    +(
      activeFlcs.reduce(
        (a, f) => a + f.currentPowerKw,
        0
      ) / 1000
    ).toFixed(2)


  /*
   * If the real event store has an active event,
   * use that.
   *
   * Otherwise show our demo event.
   */
  const storeRunningEvents =
    liveEvents.filter(
      (e) =>
        ![
          'COMPLETED',
          'SETTLED',
        ].includes(e.status)
    )


  const runningEvents =
    storeRunningEvents.length > 0
      ? storeRunningEvents
      : [DEMO_ACTIVE_EVENT]


  /*
   * Demo event is 50 kW.
   * We use it for the Operations dashboard only
   * when there is no real simulation event running.
   */
  const currentEvent =
    runningEvents[0]


  const dashboardCurtailmentKw =
    storeRunningEvents.length > 0
      ? currentEvent.matchedKw || 0
      : DEMO_ACTIVE_EVENT.matchedKw


  const dashboardActiveFlcs =
    storeRunningEvents.length > 0
      ? activeFlcs.length
      : DEMO_ACTIVE_EVENT.activeFlcs


  const totalMw =
    availableMw + utilizedMw


  const utilizationPct =
    totalMw > 0
      ? Math.round(
          (utilizedMw / totalMw) * 100
        )
      : 0


  const todaysCount =
    liveEvents.length +
    HISTORICAL_EVENTS.filter(
      (e) =>
        e.time.startsWith('03 Sep')
    ).length


  return (
    <div className="space-y-6">


      {/* =====================================================
          DEMO MODE BANNER
          ===================================================== */}

      <div className="flex items-center justify-between rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3">

        <div className="flex items-center gap-3">

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100">

            <Radio
              className="h-4 w-4 text-yellow-700"
              strokeWidth={1.8}
            />

          </div>

          <div>

            <p className="text-xs font-semibold text-yellow-900">
              DEMO NETWORK ACTIVE
            </p>

            <p className="text-[11px] text-yellow-800">
              Operations data includes simulated grid activity for demonstration.
            </p>

          </div>

        </div>

        <span className="hidden rounded-full border border-yellow-300 bg-white px-2.5 py-1 text-[10px] font-semibold text-yellow-800 sm:block">
          SIMULATED
        </span>

      </div>


      {/* =====================================================
          DASHBOARD KPIs
          ===================================================== */}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">

        <KpiCard
          label="Available flexibility"
          value={availableMw}
          unit="MW"
          tone="teal"
        />

        <KpiCard
          label="Active curtailment"
          value={(dashboardCurtailmentKw / 1000).toFixed(2)}
          unit="MW"
          tone="clay"
        />

        <KpiCard
          label="Active FLCs"
          value={dashboardActiveFlcs}
          tone="sun"
        />

        <KpiCard
          label="Connected FLCs"
          value={flcs.length}
        />

        <KpiCard
          label="Today's events"
          value={todaysCount}
        />

        <KpiCard
          label="Flexibility utilisation"
          value={utilizationPct}
          unit="%"
        />

      </div>


      {/* =====================================================
          LIVE EVENT HERO
          ===================================================== */}

      <div className="rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 via-white to-orange-50 p-5 shadow-sm">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

          <div>

            <div className="flex items-center gap-2">

              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />

              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-red-700">
                Live curtailment event
              </span>

              <span className="rounded-full border border-red-200 bg-white px-2 py-0.5 text-[9px] font-semibold text-red-600">
                DEMO
              </span>

            </div>


            <h2 className="mt-2 text-xl font-semibold text-ink">
              {currentEvent.plant}
            </h2>


            <p className="mt-1 text-xs text-ink-soft">
              {currentEvent.location || 'Bikaner, Rajasthan'}
              {' · '}
              Event {currentEvent.id}
            </p>

          </div>


          <StatusBadge status="ACTIVE" />

        </div>


        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">

          <div className="rounded-xl border border-white bg-white/80 p-4">

            <div className="flex items-center gap-2 text-ink-faint">

              <Zap
                className="h-4 w-4 text-red-600"
                strokeWidth={1.8}
              />

              <span className="text-[10px] font-medium uppercase tracking-wide">
                Curtailment
              </span>

            </div>

            <p className="mt-2 font-mono text-2xl font-medium text-ink">
              {currentEvent.requiredKw}
              <span className="ml-1 text-sm text-ink-faint">
                kW
              </span>
            </p>

          </div>


          <div className="rounded-xl border border-white bg-white/80 p-4">

            <div className="flex items-center gap-2 text-ink-faint">

              <Gauge
                className="h-4 w-4 text-teal-600"
                strokeWidth={1.8}
              />

              <span className="text-[10px] font-medium uppercase tracking-wide">
                Flexibility matched
              </span>

            </div>

            <p className="mt-2 font-mono text-2xl font-medium text-teal-700">
              {currentEvent.matchedKw}
              <span className="ml-1 text-sm text-ink-faint">
                kW
              </span>
            </p>

          </div>


          <div className="rounded-xl border border-white bg-white/80 p-4">

            <div className="flex items-center gap-2 text-ink-faint">

              <UserPlus
                className="h-4 w-4 text-sun-600"
                strokeWidth={1.8}
              />

              <span className="text-[10px] font-medium uppercase tracking-wide">
                FLCs active
              </span>

            </div>

            <p className="mt-2 font-mono text-2xl font-medium text-ink">
              {currentEvent.activeFlcs || dashboardActiveFlcs}
            </p>

          </div>


          <div className="rounded-xl border border-white bg-white/80 p-4">

            <div className="flex items-center gap-2 text-ink-faint">

              <Clock
                className="h-4 w-4 text-orange-600"
                strokeWidth={1.8}
              />

              <span className="text-[10px] font-medium uppercase tracking-wide">
                Time remaining
              </span>

            </div>

            <p className="mt-2 font-mono text-2xl font-medium text-ink">
              {currentEvent.remainingMinutes || 12}
              <span className="ml-1 text-sm text-ink-faint">
                min
              </span>
            </p>

          </div>

        </div>


        {/* Event progress */}

        <div className="mt-5">

          <div className="mb-2 flex items-center justify-between">

            <span className="text-xs font-medium text-ink-soft">
              Event progress
            </span>

            <span className="font-mono text-xs text-ink-faint">
              {currentEvent.elapsedMinutes || 18}
              {' / '}
              {currentEvent.durationMinutes || 30}
              {' min'}
            </span>

          </div>


          <div className="h-2 overflow-hidden rounded-full bg-red-100">

            <div
              className="h-full rounded-full bg-red-500 transition-all"
              style={{
                width: `${
                  (
                    (currentEvent.elapsedMinutes || 18) /
                    (currentEvent.durationMinutes || 30)
                  ) * 100
                }%`,
              }}
            />

          </div>

        </div>

      </div>


      {/* =====================================================
          FLEXIBILITY CAPACITY
          ===================================================== */}

      <div className="rounded-xl border border-line bg-white p-5">

        <div className="flex items-start justify-between">

          <div>

            <p className="text-xs text-ink-faint">
              Available flexibility
            </p>

            <div className="mt-2 flex items-baseline gap-2">

              <span className="font-mono text-3xl font-medium text-teal-600">
                {totalMw.toFixed(2)}
              </span>

              <span className="text-sm text-ink-soft">
                MW across the Bikaner network
              </span>

            </div>

          </div>


          <Activity
            className="hidden h-5 w-5 text-teal-600 sm:block"
            strokeWidth={1.8}
          />

        </div>


        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-paper-dim">

          <div
            className="h-full rounded-full bg-teal-500 transition-all duration-700"
            style={{
              width: `${utilizationPct}%`,
            }}
          />

        </div>


        <p className="mt-2 text-xs text-ink-faint">
          {utilizationPct}% utilised right now
        </p>

      </div>


      {/* =====================================================
          ACTIVE CURTAILMENT EVENTS
          ===================================================== */}

      <div>

        <div className="mb-3 flex items-center justify-between">

          <div>

            <h2 className="text-sm font-medium text-ink">
              Active curtailment events
            </h2>

            <p className="mt-0.5 text-[11px] text-ink-faint">
              Live flexibility dispatch across connected plants
            </p>

          </div>


          <Link
            to="/discom/simulation"
            className="inline-flex items-center gap-1 text-xs font-medium text-teal-600"
          >
            Simulate an event

            <ArrowRight
              className="h-3 w-3"
              strokeWidth={1.75}
            />

          </Link>

        </div>


        <div className="space-y-2">

          {runningEvents.map((e) => (

            <div
              key={e.id}
              className="rounded-xl border border-line bg-white px-4 py-4 shadow-sm"
            >

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <div className="flex items-center gap-2">

                    <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />

                    <p className="text-sm font-medium text-ink">
                      {e.plant}
                    </p>

                  </div>

                  <p className="mt-1 font-mono text-xs text-ink-faint">
                    {e.requiredKw} kW required
                    {' · '}
                    {e.matchedKw} kW matched
                    {' · '}
                    {e.activeFlcs || 6} FLCs participating
                  </p>

                </div>


                <div className="flex items-center gap-3">

                  <div className="hidden text-right sm:block">

                    <p className="text-[10px] uppercase tracking-wide text-ink-faint">
                      Dispatch
                    </p>

                    <p className="font-mono text-xs font-medium text-teal-700">
                      {e.matchedKw} / {e.requiredKw} kW
                    </p>

                  </div>

                  <StatusBadge
                    status={e.status}
                  />

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* =====================================================
          YUVASETU PROGRAM NETWORK
          ===================================================== */}

      <div className="rounded-2xl border border-line bg-gradient-to-br from-sun-50 via-white to-teal-50 p-5 shadow-sm">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-start gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-teal-700 shadow-sm">

              <Network
                className="h-5 w-5"
                strokeWidth={1.8}
              />

            </div>


            <div>

              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-700">
                YUVASETU PROGRAM
              </p>

              <h2 className="mt-1 text-lg font-semibold text-ink">
                Grow the flexibility network
              </h2>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-ink-soft">
                Register solar plants with CDUs and flexible loads with FLC devices to expand the network available for demand-response events.
              </p>

            </div>

          </div>


          <Link
            to="/discom/registration"
            className="flex shrink-0 items-center gap-2 rounded-xl border border-white bg-white px-3 py-2 text-xs font-semibold text-teal-700 shadow-sm hover:bg-paper"
          >

            <UserPlus
              className="h-4 w-4"
              strokeWidth={1.8}
            />

            Device onboarding

          </Link>

        </div>

      </div>


    </div>
  )
}
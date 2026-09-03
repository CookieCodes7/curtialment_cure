import { Zap, IndianRupee } from 'lucide-react'
import { useEventStore } from '../../lib/useEventStore.js'
import { useAuth } from '../../context/AuthContext.jsx'

const FLC_ID = 'FLC-001'

export default function FarmerDashboard() {
  const { session } = useAuth()
  const { flcs, liveEvents } = useEventStore()
  const myFlc = flcs.find((f) => f.id === (session?.flcId ?? FLC_ID))
  const active = myFlc?.status === 'active'

  const myEvent = liveEvents.find((e) => e.selected?.some((s) => s.id === myFlc?.id) && e.status !== 'SETTLED')

  return (
    <div className="space-y-4">
      {active ? (
        <div className="rounded-2xl border border-sun-200 bg-sun-50 p-6 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-sun-600">Your pump</p>
          <p className="mt-2 text-2xl font-semibold text-sun-600">Active now</p>
          <p className="mt-1 text-sm text-sun-600">Flexibility event in progress — free power</p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5">
            <Zap className="h-4 w-4 text-sun-600" strokeWidth={1.75} />
            <span className="font-mono text-sm text-ink">{myFlc.currentPowerKw} kW right now</span>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-moss-200 bg-moss-50 p-6 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-moss-600">Your pump</p>
          <p className="mt-2 text-2xl font-semibold text-moss-600">Available</p>
          <p className="mt-1 text-sm text-moss-600">Ready for the next flexibility event</p>
        </div>
      )}

      <div className="rounded-2xl border border-line bg-white p-6 text-center">
        <p className="text-xs text-ink-faint">This month</p>
        <p className="mt-1 flex items-center justify-center gap-1 text-3xl font-semibold text-ink">
          <IndianRupee className="h-6 w-6" strokeWidth={2} />428.50
        </p>
        <p className="mt-1 text-sm text-ink-soft">earned from flexibility</p>
        <div className="mt-4 flex justify-center gap-8 border-t border-line pt-4 text-sm">
          <div>
            <p className="font-mono text-lg text-ink">12</p>
            <p className="text-xs text-ink-faint">events</p>
          </div>
          <div>
            <p className="font-mono text-lg text-ink">53.4</p>
            <p className="text-xs text-ink-faint">kWh consumed</p>
          </div>
        </div>
      </div>

      {myEvent && (
        <div className="rounded-xl border border-line bg-white p-4 text-sm text-ink-soft">
          Event {myEvent.id} at {myEvent.plant} is currently <span className="font-medium text-ink">{myEvent.status.toLowerCase()}</span>.
        </div>
      )}
    </div>
  )
}

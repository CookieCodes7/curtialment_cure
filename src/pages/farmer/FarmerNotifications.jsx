import { useState } from 'react'
import { Zap, CheckCircle2, MessageSquare, Phone, Smartphone } from 'lucide-react'
import { useEventStore } from '../../lib/useEventStore.js'
import { useAuth } from '../../context/AuthContext.jsx'

const STATIC = [
  { text: 'Your pump was activated', time: '12:15 PM' },
  { text: 'Event completed — 3.5 kWh verified, ₹28.00 added to your earnings', time: '12:45 PM' },
]

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`h-5 w-9 rounded-full transition-colors ${on ? 'bg-moss-500' : 'bg-line'}`}
    >
      <span className={`block h-4 w-4 translate-x-0.5 rounded-full bg-white transition-transform ${on ? 'translate-x-4' : ''}`} />
    </button>
  )
}

export default function FarmerNotifications() {
  const { session } = useAuth()
  const { notifications } = useEventStore()
  const mine = notifications.farmer[session?.flcId ?? 'FLC-001'] ?? []
  const feed = [...mine, ...STATIC]

  const [prefs, setPrefs] = useState({ sms: true, ivr: true, app: true })

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-line bg-white p-4">
        <p className="mb-3 text-xs text-ink-faint">Recent activity</p>
        <div className="space-y-3">
          {feed.map((n, i) => (
            <div key={i} className="flex gap-2.5">
              {/verified|earnings/i.test(n.text) ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-moss-500" strokeWidth={1.75} />
              ) : (
                <Zap className="mt-0.5 h-4 w-4 shrink-0 text-sun-600" strokeWidth={1.75} />
              )}
              <div>
                <p className="text-sm text-ink">{n.text}</p>
                <p className="font-mono text-xs text-ink-faint">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-white p-4">
        <p className="mb-1 text-xs text-ink-faint">Communication</p>
        <p className="mb-3 text-xs text-ink-faint">
          Your account can receive updates by SMS or voice call even without using this app.
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm text-ink"><MessageSquare className="h-4 w-4 text-ink-faint" strokeWidth={1.75} />SMS</span>
            <Toggle on={prefs.sms} onChange={() => setPrefs((p) => ({ ...p, sms: !p.sms }))} />
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm text-ink"><Phone className="h-4 w-4 text-ink-faint" strokeWidth={1.75} />Voice / IVR · 1800-180-1551</span>
            <Toggle on={prefs.ivr} onChange={() => setPrefs((p) => ({ ...p, ivr: !p.ivr }))} />
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm text-ink"><Smartphone className="h-4 w-4 text-ink-faint" strokeWidth={1.75} />App notifications (optional)</span>
            <Toggle on={prefs.app} onChange={() => setPrefs((p) => ({ ...p, app: !p.app }))} />
          </div>
        </div>
      </div>
    </div>
  )
}

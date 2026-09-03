import { useState, useRef, useEffect } from 'react'
import { Bell, LogOut, ChevronDown, AlertTriangle, Zap, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

function iconFor(text) {
  if (/offline|error|unable/i.test(text)) return AlertTriangle
  if (/completed|verified|settled/i.test(text)) return CheckCircle2
  return Zap
}

export default function Topbar({ title, subtitle, statusLabel, notifications = [] }) {
  const { session, logout } = useAuth()
  const [notifOpen, setNotifOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setNotifOpen(false)
        setUserOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <header className="flex items-center justify-between border-b border-line bg-white px-5 py-3.5 md:px-8">
      <div>
        <h1 className="text-lg font-semibold text-ink">{title}</h1>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-ink-faint">
          {subtitle && <span>{subtitle}</span>}
          {statusLabel && (
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-moss-500" />
              {statusLabel}
            </span>
          )}
        </div>
      </div>

      <div ref={ref} className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line hover:bg-paper-dim"
          >
            <Bell className="h-4 w-4 text-ink-soft" strokeWidth={1.75} />
            {notifications.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-clay-500 text-[10px] font-medium text-white">
                {notifications.length}
              </span>
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 z-20 mt-2 w-80 rounded-xl border border-line bg-white p-2 shadow-lg">
              <p className="px-2 py-1.5 text-xs font-medium text-ink-faint">
                {notifications.length} notification{notifications.length !== 1 && 's'}
              </p>
              {notifications.length === 0 ? (
                <p className="px-2 py-3 text-sm text-ink-faint">No notifications yet.</p>
              ) : (
                <ul className="max-h-72 space-y-1 overflow-y-auto">
                  {notifications.map((n, i) => {
                    const Icon = iconFor(n.text)
                    return (
                      <li key={i} className="flex gap-2 rounded-lg px-2 py-2 hover:bg-paper-dim">
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" strokeWidth={1.75} />
                        <div>
                          <p className="text-sm text-ink">{n.text}</p>
                          <p className="font-mono text-xs text-ink-faint">{n.time}</p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setUserOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-line py-1 pl-1 pr-2.5 hover:bg-paper-dim"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sun-50 text-xs font-medium text-sun-600">
              {session?.name?.[0] ?? '?'}
            </span>
            <span className="hidden text-sm text-ink sm:inline">{session?.name}</span>
            <ChevronDown className="h-3.5 w-3.5 text-ink-faint" strokeWidth={1.75} />
          </button>
          {userOpen && (
            <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-line bg-white p-1.5 shadow-lg">
              <button
                onClick={logout}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-clay-600 hover:bg-clay-50"
              >
                <LogOut className="h-4 w-4" strokeWidth={1.75} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

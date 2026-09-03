import { useState, useRef, useEffect } from 'react'
import {
  Bell,
  LogOut,
  ChevronDown,
  AlertTriangle,
  Zap,
  CheckCircle2,
} from 'lucide-react'

import { useAuth } from '../context/AuthContext.jsx'

function iconFor(text) {
  if (/offline|error|unable/i.test(text)) {
    return AlertTriangle
  }

  if (/completed|verified|settled/i.test(text)) {
    return CheckCircle2
  }

  return Zap
}

export default function Topbar({
  title,
  subtitle,
  statusLabel,
  notifications = [],
}) {
  const { session, logout } = useAuth()

  const [notifOpen, setNotifOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)

  const ref = useRef(null)

  useEffect(() => {
    function onClick(e) {
      if (
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setNotifOpen(false)
        setUserOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      onClick
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        onClick
      )
    }
  }, [])

  return (
    <header className="flex min-h-[72px] items-center justify-between border-b border-line bg-white px-5 py-3.5 md:px-8">

      {/* Page information */}

      <div className="min-w-0">

        <h1 className="truncate text-lg font-bold tracking-tight text-ink">
          {title}
        </h1>

        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">

          {subtitle && (
            <span className="font-medium text-ink-soft">
              {subtitle}
            </span>
          )}

          {statusLabel && (
            <span className="inline-flex items-center gap-1.5 font-semibold text-moss-600">

              <span className="h-1.5 w-1.5 rounded-full bg-moss-500" />

              {statusLabel}

            </span>
          )}

        </div>

      </div>


      {/* Right controls */}

      <div
        ref={ref}
        className="ml-4 flex shrink-0 items-center gap-3"
      >

        {/* Notifications */}

        <div className="relative">

          <button
            type="button"
            onClick={() =>
              setNotifOpen((v) => !v)
            }
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white transition hover:border-yellow-300 hover:bg-yellow-50"
          >

            <Bell
              className="h-[17px] w-[17px] text-ink-soft"
              strokeWidth={1.8}
            />

            {notifications.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-clay-500 px-1 text-[9px] font-bold text-white shadow-sm">
                {notifications.length}
              </span>
            )}

          </button>


          {notifOpen && (
            <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-xl border border-line bg-white shadow-xl">

              <div className="border-b border-line px-4 py-3">

                <p className="text-sm font-bold text-ink">
                  Notifications
                </p>

                <p className="mt-0.5 text-xs text-ink-faint">
                  {notifications.length}{' '}
                  notification
                  {notifications.length !== 1
                    ? 's'
                    : ''}
                </p>

              </div>


              {notifications.length === 0 ? (

                <p className="px-4 py-5 text-sm font-medium text-ink-soft">
                  No notifications yet.
                </p>

              ) : (

                <ul className="max-h-72 space-y-1 overflow-y-auto p-2">

                  {notifications.map((n, i) => {

                    const Icon = iconFor(n.text)

                    return (
                      <li
                        key={i}
                        className="flex gap-3 rounded-lg px-3 py-2.5 transition hover:bg-paper"
                      >

                        <Icon
                          className="mt-0.5 h-4 w-4 shrink-0 text-orange-500"
                          strokeWidth={1.8}
                        />

                        <div className="min-w-0">

                          <p className="text-sm font-medium leading-5 text-ink">
                            {n.text}
                          </p>

                          <p className="mt-1 font-mono text-[10px] text-ink-faint">
                            {n.time}
                          </p>

                        </div>

                      </li>
                    )
                  })}

                </ul>

              )}

            </div>
          )}

        </div>


        {/* User menu */}

        <div className="relative">

          <button
            type="button"
            onClick={() =>
              setUserOpen((v) => !v)
            }
            className="flex min-h-[40px] items-center gap-2 rounded-full border border-line bg-white py-1 pl-1 pr-2.5 transition hover:border-yellow-300 hover:bg-yellow-50"
          >

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-xs font-bold text-yellow-700">

              {session?.name?.[0] ?? '?'}

            </span>

            <span className="hidden max-w-[140px] truncate text-sm font-semibold text-ink sm:inline">

              {session?.name}

            </span>

            <ChevronDown
              className="h-3.5 w-3.5 text-ink-soft"
              strokeWidth={1.8}
            />

          </button>


          {userOpen && (
            <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-line bg-white p-1.5 shadow-xl">

              <button
                type="button"
                onClick={logout}
                className="flex min-h-[42px] w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-clay-600 transition hover:bg-clay-50"
              >

                <LogOut
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />

                Log out

              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  )
}
import { NavLink } from 'react-router-dom'
import { Sun } from 'lucide-react'

export default function Sidebar({ items, dark = false }) {
  const base = dark
    ? 'bg-[#25302A] text-white border-[#25302A]'
    : 'bg-[#F0EDE4] text-[#37423A] border-[#D8D5CB]'

  const activeClass = dark
    ? 'bg-yellow-400/15 text-yellow-300 border border-yellow-400/20'
    : 'bg-white text-[#18201B] shadow-sm border border-[#E4E0D6]'

  const inactiveClass = dark
    ? 'text-gray-200 hover:bg-white/10 hover:text-white'
    : 'text-[#4B5563] hover:bg-white/70 hover:text-[#18201B]'

  const accent = dark
    ? 'text-yellow-300'
    : 'text-sun-600'

  return (
    <aside
      className={`hidden w-60 shrink-0 flex-col border-r px-3 py-5 md:flex ${base}`}
    >

      {/* Logo */}

      <div className="mb-7 flex items-center gap-2.5 px-2">

        <div
          className={[
            'flex h-9 w-9 items-center justify-center rounded-lg',
            dark
              ? 'bg-yellow-400/15 border border-yellow-300/20'
              : 'bg-yellow-100 border border-yellow-200',
          ].join(' ')}
        >
          <Sun
            className={`h-5 w-5 ${accent}`}
            strokeWidth={1.75}
          />
        </div>

        <div>
          <div
            className={`font-bold tracking-tight ${
              dark ? 'text-white' : 'text-[#18201B]'
            }`}
          >
            SolarRevive
          </div>

          <div
            className={`text-[9px] font-semibold uppercase tracking-[0.16em] ${
              dark ? 'text-gray-300' : 'text-gray-500'
            }`}
          >
            Energy Platform
          </div>
        </div>

      </div>


      {/* Navigation */}

      <nav className="flex flex-col gap-1">

        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 rounded-lg px-3 py-2.5',
                'text-sm font-medium transition-all duration-200',
                isActive ? activeClass : inactiveClass,
              ].join(' ')
            }
          >

            <item.icon
              className="h-[17px] w-[17px] shrink-0"
              strokeWidth={1.8}
            />

            <span>{item.label}</span>

          </NavLink>
        ))}

      </nav>


      {/* Bottom status */}

      <div className="mt-auto px-2 pt-6">

        <div
          className={[
            'rounded-xl border p-3',
            dark
              ? 'border-white/10 bg-white/[0.06]'
              : 'border-gray-200 bg-white/70',
          ].join(' ')}
        >

          <div className="flex items-center gap-2">

            <span
              className={`h-2 w-2 rounded-full ${
                dark ? 'bg-yellow-300' : 'bg-green-500'
              }`}
            />

            <span
              className={`text-[11px] font-semibold ${
                dark ? 'text-white' : 'text-[#37423A]'
              }`}
            >
              System operational
            </span>

          </div>

          <p
            className={`mt-1 text-[10px] leading-4 ${
              dark ? 'text-gray-300' : 'text-gray-500'
            }`}
          >
            SolarRevive renewable flexibility network
          </p>

        </div>

      </div>

    </aside>
  )
}
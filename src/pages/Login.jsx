import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import {
  Sun,
  ArrowLeft,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react'

import { useAuth } from '../context/AuthContext.jsx'

const ROLE_META = {
  plant: {
    title: 'Plant developer login',
    demo: 'plant@yuvasetu.demo',
    description:
      'Access renewable generation and curtailment analytics.',
  },

  discom: {
    title: 'DISCOM / grid operator login',
    demo: 'discom@yuvasetu.demo',
    description:
      'Access live grid flexibility and event controls.',
  },

  farmer: {
    title: 'Participant login',
    demo: 'farmer@yuvasetu.demo',
    description:
      'Manage your flexible load and participation.',
  },
}

export default function Login() {
  const { role } = useParams()

  const meta =
    ROLE_META[role] ??
    ROLE_META.plant

  const navigate = useNavigate()

  const { login } = useAuth()

  const [email, setEmail] =
    useState(meta.demo)

  const [password, setPassword] =
    useState('password123')

  const [error, setError] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  async function onSubmit(e) {
    e.preventDefault()

    if (
      !email.trim() ||
      !password.trim()
    ) {
      setError(
        'Enter both email and password.'
      )

      return
    }

    setError('')
    setLoading(true)

    try {
      const session =
        await login(
          email,
          password
        )

      navigate(
        `/${session.role}/dashboard`
      )
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-paper px-6 py-10">

      {/* Background */}

      <div className="pointer-events-none absolute left-1/2 top-[-280px] h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-yellow-300/15 blur-[130px]" />

      <div className="pointer-events-none absolute bottom-[-200px] right-[-150px] h-[400px] w-[400px] rounded-full bg-orange-300/10 blur-[120px]" />


      {/* Login card */}

      <div className="relative z-10 w-full max-w-[420px]">

        {/* Back */}

        <Link
          to="/"
          className="mb-6 inline-flex min-h-[40px] items-center gap-2 rounded-lg px-2 text-sm font-semibold text-ink-soft transition hover:bg-white hover:text-ink"
        >

          <ArrowLeft
            className="h-4 w-4"
            strokeWidth={1.8}
          />

          Back to role selection

        </Link>


        {/* Brand */}

        <div className="mb-7 flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-200 bg-yellow-100 shadow-sm">

            <Sun
              className="h-6 w-6 text-yellow-600"
              strokeWidth={1.7}
            />

          </div>

          <div>

            <div className="text-xl font-bold tracking-tight text-ink">
              YuvaSetu
            </div>

            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink-faint">
              Renewable Flexibility Network
            </div>

          </div>

        </div>


        {/* Card */}

        <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_20px_60px_rgba(80,60,20,0.08)] sm:p-8">

          <div className="mb-6">

            <h1 className="text-2xl font-bold tracking-tight text-ink">
              {meta.title}
            </h1>

            <p className="mt-2 text-sm leading-6 text-ink-soft">
              {meta.description}
            </p>

          </div>


          {/* Form */}

          <form
            onSubmit={onSubmit}
            className="space-y-5"
          >

            {/* Email */}

            <div>

              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink-soft">
                Email or phone
              </label>

              <input
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="min-h-[46px] w-full rounded-lg border border-line bg-white px-3.5 text-sm font-medium text-ink outline-none transition placeholder:text-gray-400 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10"
                type="text"
                autoComplete="username"
              />

            </div>


            {/* Password */}

            <div>

              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink-soft">
                Password
              </label>

              <input
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="min-h-[46px] w-full rounded-lg border border-line bg-white px-3.5 text-sm font-medium text-ink outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10"
                type="password"
                autoComplete="current-password"
              />

            </div>


            {/* Error */}

            {error && (
              <div className="rounded-lg border border-orange-200 bg-orange-50 px-3.5 py-3">

                <p className="text-sm font-semibold text-clay-600">
                  {error}
                </p>

              </div>
            )}


            {/* Login */}

            <button
              type="submit"
              disabled={loading}
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#B45309] px-4 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#92400E] hover:shadow-md focus:ring-4 focus:ring-yellow-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading
                ? 'Logging in…'
                : 'Log in'}

              {!loading && (
                <ArrowRight
                  className="h-4 w-4"
                  strokeWidth={2}
                />
              )}

            </button>

          </form>


          {/* Demo credentials */}

          <div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 p-4">

            <div className="flex items-center gap-2">

              <ShieldCheck
                className="h-4 w-4 text-yellow-700"
                strokeWidth={1.8}
              />

              <p className="text-xs font-bold text-yellow-800">
                Demo credentials
              </p>

            </div>

            <div className="mt-3 rounded-lg bg-white/80 p-3">

              <p className="font-mono text-xs font-medium text-gray-700">
                {meta.demo}
              </p>

              <p className="mt-1 font-mono text-xs font-medium text-gray-700">
                password123
              </p>

            </div>

          </div>

        </div>


        {/* Footer */}

        <p className="mt-5 text-center text-[10px] font-medium text-ink-faint">
          YuvaSetu prototype · Secure demo environment
        </p>

      </div>

    </div>
  )
}
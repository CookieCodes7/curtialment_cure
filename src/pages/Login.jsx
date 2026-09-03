import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Sun, ArrowLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

const ROLE_META = {
  plant: { title: 'Plant developer login', demo: 'plant@yuvasetu.demo' },
  discom: { title: 'DISCOM / grid operator login', demo: 'discom@yuvasetu.demo' },
  farmer: { title: 'Participant login', demo: 'farmer@yuvasetu.demo' },
}

export default function Login() {
  const { role } = useParams()
  const meta = ROLE_META[role] ?? ROLE_META.plant
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState(meta.demo)
  const [password, setPassword] = useState('password123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Enter both email and password.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const session = await login(email, password)
      navigate(`/${session.role}/dashboard`)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-ink-faint hover:text-ink-soft">
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
          Back to role selection
        </Link>

        <div className="mb-6 flex items-center gap-2">
          <Sun className="h-5 w-5 text-sun-600" strokeWidth={1.75} />
          <span className="font-semibold text-ink">YuvaSetu</span>
        </div>

        <h1 className="text-lg font-medium text-ink">{meta.title}</h1>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs text-ink-soft">Email or phone</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-sun-500"
              type="text"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-ink-soft">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-sun-500"
              type="password"
            />
          </div>

          {error && <p className="text-xs text-clay-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-ink py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <div className="mt-6 rounded-lg bg-paper-dim px-4 py-3 text-xs text-ink-soft">
          <p className="font-medium text-ink">Demo credentials</p>
          <p className="mt-1 font-mono">{meta.demo}</p>
          <p className="font-mono">password123</p>
        </div>
      </div>
    </div>
  )
}

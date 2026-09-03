import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ role, children }) {
  const { session } = useAuth()

  if (!session) return <Navigate to="/" replace />
  if (session.role !== role) return <Navigate to={`/${session.role}/dashboard`} replace />

  return children
}

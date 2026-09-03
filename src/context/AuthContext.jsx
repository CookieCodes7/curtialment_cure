import { createContext, useContext, useState, useCallback } from 'react'
import * as authApi from '../api/auth.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => authApi.getSession())

  const login = useCallback(async (email, password) => {
    const s = await authApi.login(email, password)
    setSession(s)
    return s
  }, [])

  const logout = useCallback(() => {
    authApi.logout()
    setSession(null)
  }, [])

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

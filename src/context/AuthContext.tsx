import { createContext, useContext, type ReactNode } from 'react'
import { useAuth } from '../hooks/useAuth'

type AuthValue = ReturnType<typeof useAuth>

const AuthContext = createContext<AuthValue | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuthContext = (): AuthValue => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}
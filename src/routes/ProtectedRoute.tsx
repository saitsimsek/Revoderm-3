import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { ROUTES } from '../constants/routes'
import { LoadingSpinner } from '../components/common/LoadingSpinner/LoadingSpinner'

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuthContext()

  if (loading) {
    return <LoadingSpinner label="Session checking..." />
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <Outlet />
}
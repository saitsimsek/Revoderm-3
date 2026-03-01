import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import { ROUTES } from '../../constants/routes'

export const DashboardPage = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuthContext()

  const onLogout = () => {
    logout()
    navigate(ROUTES.LOGIN)
  }

  return (
    <main className="page">
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name ?? 'User'}.</p>
      <button type="button" className="button" onClick={onLogout}>
        Logout
      </button>
    </main>
  )
}
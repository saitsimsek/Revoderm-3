import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { ProtectedRoute } from './ProtectedRoute'
import { HomePage } from '../pages/HomePage/HomePage'
import { LoginPage } from '../pages/LoginPage/LoginPage'
import { DashboardPage } from '../pages/DashboardPage/DashboardPage'
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage'

export const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.HOME} element={<HomePage />} />
    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
    <Route element={<ProtectedRoute />}>
      <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
    <Route path="/home" element={<Navigate to={ROUTES.HOME} replace />} />
  </Routes>
)
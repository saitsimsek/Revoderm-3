import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

export const HomePage = () => (
  <main className="page">
    <h1>Revoderm Frontend</h1>
    <p>React + TypeScript starter with auth hooks, services and routing.</p>
    <Link className="button" to={ROUTES.LOGIN}>
      Go to Login
    </Link>
  </main>
)
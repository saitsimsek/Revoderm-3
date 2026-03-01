import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

export const NotFoundPage = () => (
  <main className="page">
    <h1>404</h1>
    <p>Page not found.</p>
    <Link className="button" to={ROUTES.HOME}>
      Back to Home
    </Link>
  </main>
)
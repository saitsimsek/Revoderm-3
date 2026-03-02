import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import { ROUTES } from '../../constants/routes'
import { ErrorMessage } from '../../components/common/ErrorMessage/ErrorMessage'

export const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuthContext()

  const [email, setEmail] = useState('demo@revoderm.com')
  const [password, setPassword] = useState('password123')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    console.log("abc") 
      console.log("abc") 
       console.log("abc") 
      console.log("abc") 
    try {
      await login(email, password)
      navigate(ROUTES.DASHBOARD)
    } catch (submissionError) {
      const message = submissionError instanceof Error ? submissionError.message : 'Login failed.'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="page">
      <h1>Login</h1>
      <form className="card" onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && <ErrorMessage message={error} />}

        <button type="submit" className="button" disabled={submitting}>
          {submitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}

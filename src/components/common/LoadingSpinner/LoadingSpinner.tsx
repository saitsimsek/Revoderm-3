interface LoadingSpinnerProps {
  label?: string
}

export const LoadingSpinner = ({ label = 'Loading...' }: LoadingSpinnerProps) => (
  <div role="status" aria-live="polite" className="status-card">
    {label}
  </div>
)
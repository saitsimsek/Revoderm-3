interface ErrorMessageProps {
  message: string
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <p role="alert" className="error-text">
    {message}
  </p>
)
function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      {message}
    </div>
  )
}

function ErrorState({ message = 'Something went wrong.' }) {
  return (
    <div className="error" role="alert">
      {message}
    </div>
  )
}

export { LoadingState, ErrorState }

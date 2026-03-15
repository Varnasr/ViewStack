function LoadingState({ message = 'Loading...' }) {
  return <div className="loading">{message}</div>
}

function ErrorState({ message = 'Something went wrong.' }) {
  return <div className="error">{message}</div>
}

export { LoadingState, ErrorState }

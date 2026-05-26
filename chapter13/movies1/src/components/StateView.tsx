export function Loader() {
  return <div role="status">Loading...</div>
}

export function ErrorMessage({ message }: { message: string }) {
  return <div role="alert">{message}</div>
}

export function EmptyState({ message }: { message: string }) {
  return <p>{message}</p>
}

import { useState, type FormEvent } from 'react'

interface Props {
  onSearch: (query: string) => void
  initialQuery: string
}

export function SearchForm({ onSearch, initialQuery }: Props) {
  const [value, setValue] = useState(initialQuery)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onSearch(trimmed)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Search movies (English)"
      />
      <button type="submit">검색</button>
    </form>
  )
}

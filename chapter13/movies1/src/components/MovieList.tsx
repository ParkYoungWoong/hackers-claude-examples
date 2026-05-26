import { useEffect, useRef } from 'react'
import type { MovieSummary } from '@/types/movie'
import { MovieCard } from './MovieCard'

interface Props {
  movies: MovieSummary[]
  hasNextPage: boolean
  isFetchingNextPage: boolean
  onLoadMore: () => void
}

export function MovieList({ movies, hasNextPage, isFetchingNextPage, onLoadMore }: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el || !hasNextPage) return

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isFetchingNextPage) {
        onLoadMore()
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, onLoadMore])

  return (
    <div>
      <ul>
        {movies.map(movie => (
          <li key={movie.imdbID}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
      <div ref={sentinelRef} data-testid="sentinel" />
      {isFetchingNextPage && <p>Loading more...</p>}
    </div>
  )
}

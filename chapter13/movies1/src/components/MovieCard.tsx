import { Link } from 'react-router'
import type { MovieSummary } from '@/types/movie'

const PLACEHOLDER = 'https://placeholder.co/300x450?text=No+Image'

interface Props {
  movie: MovieSummary
}

export function MovieCard({ movie }: Props) {
  const poster = movie.Poster === 'N/A' ? PLACEHOLDER : movie.Poster
  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <img
        src={poster}
        alt={movie.Title}
      />
      <h2>{movie.Title}</h2>
      <p>{movie.Year}</p>
    </Link>
  )
}

import { useQuery } from '@tanstack/react-query'
import { getMovieDetail } from '@/api/omdb'

export function useMovieDetail(imdbID: string) {
  return useQuery({
    queryKey: ['movie', imdbID],
    queryFn: () => getMovieDetail(imdbID),
    enabled: imdbID.length > 0
  })
}

import { useInfiniteQuery } from '@tanstack/react-query'
import { searchMovies } from '@/api/omdb'
import { getNextPageParam } from '@/lib/pagination'

export function useMovieSearch(query: string) {
  return useInfiniteQuery({
    queryKey: ['search', query],
    queryFn: ({ pageParam }) => searchMovies(query, pageParam),
    initialPageParam: 1,
    getNextPageParam,
    enabled: query.length > 0
  })
}

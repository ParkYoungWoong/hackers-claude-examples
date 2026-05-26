import type { SearchResponse } from '@/types/movie'

export function getNextPageParam(
  lastPage: SearchResponse,
  allPages: SearchResponse[],
  lastPageParam: number
): number | undefined {
  if (lastPage.Response === 'False') return undefined
  const loaded = allPages.reduce((sum, p) => sum + (p.Search?.length ?? 0), 0)
  const total = Number(lastPage.totalResults ?? 0)
  return loaded < total ? lastPageParam + 1 : undefined
}

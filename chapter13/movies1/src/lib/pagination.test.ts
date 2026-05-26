import { describe, it, expect } from 'vitest'
import type { SearchResponse } from '@/types/movie'
import { getNextPageParam } from './pagination'

function page(count: number, total: number): SearchResponse {
  return {
    Search: Array.from({ length: count }, (_, i) => ({
      Title: `M${i}`, Year: '2020', imdbID: `tt${i}`, Type: 'movie', Poster: 'N/A'
    })),
    totalResults: String(total),
    Response: 'True'
  }
}

describe('getNextPageParam', () => {
  it('로드한 개수가 전체보다 적으면 다음 페이지 번호를 반환한다', () => {
    const allPages = [page(10, 25)]
    expect(getNextPageParam(page(10, 25), allPages, 1)).toBe(2)
  })

  it('로드한 개수가 전체와 같으면 undefined를 반환한다', () => {
    const allPages = [page(10, 25), page(10, 25), page(5, 25)]
    expect(getNextPageParam(page(5, 25), allPages, 3)).toBeUndefined()
  })

  it('결과 없음(Response False)이면 undefined를 반환한다', () => {
    const empty: SearchResponse = { Response: 'False', Error: 'Movie not found!' }
    expect(getNextPageParam(empty, [empty], 1)).toBeUndefined()
  })
})

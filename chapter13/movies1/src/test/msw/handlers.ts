import { http, HttpResponse } from 'msw'
import type { MovieSummary } from '@/types/movie'

const BASE = 'https://www.omdbapi.com/'

// page 번호로 10개씩 가짜 영화 생성 (총 25개 = 3페이지)
const TOTAL = 25
function makePage(page: number): MovieSummary[] {
  const start = (page - 1) * 10
  const count = Math.min(10, TOTAL - start)
  if (count <= 0) return []
  return Array.from({ length: count }, (_, i) => {
    const n = start + i + 1
    return {
      Title: `Movie ${n}`,
      Year: '2020',
      imdbID: `tt${String(n).padStart(7, '0')}`,
      Type: 'movie',
      Poster: n % 5 === 0 ? 'N/A' : `https://example.com/poster${n}.jpg`
    }
  })
}

export const handlers = [
  http.get(BASE, ({ request }) => {
    const url = new URL(request.url)
    const s = url.searchParams.get('s')
    const i = url.searchParams.get('i')

    if (i) {
      return HttpResponse.json({
        Title: 'Movie Detail',
        Year: '2020',
        Rated: 'PG-13',
        Runtime: '120 min',
        Genre: 'Action',
        Director: 'Some Director',
        Actors: 'A, B, C',
        Plot: 'A plot.',
        Poster: 'https://example.com/detail.jpg',
        imdbRating: '8.0',
        imdbID: i,
        Type: 'movie',
        Response: 'True'
      })
    }

    if (s) {
      const page = Number(url.searchParams.get('page') ?? '1')
      const Search = makePage(page)
      if (Search.length === 0) {
        return HttpResponse.json({
          Response: 'False',
          Error: 'Movie not found!'
        })
      }
      return HttpResponse.json({
        Search,
        totalResults: String(TOTAL),
        Response: 'True'
      })
    }

    return HttpResponse.json({ Response: 'False', Error: 'Incorrect IMDb ID.' })
  })
]

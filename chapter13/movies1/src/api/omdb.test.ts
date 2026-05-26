import { describe, it, expect } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '@/test/msw/server'
import { searchMovies, getMovieDetail } from './omdb'

describe('searchMovies', () => {
  it('apikey, s, page 쿼리로 요청하고 결과를 반환한다', async () => {
    let captured: URL | null = null
    server.use(
      http.get('https://www.omdbapi.com/', ({ request }) => {
        captured = new URL(request.url)
        return HttpResponse.json({
          Search: [
            {
              Title: 'A',
              Year: '2020',
              imdbID: 'tt1',
              Type: 'movie',
              Poster: 'N/A'
            }
          ],
          totalResults: '1',
          Response: 'True'
        })
      })
    )

    const res = await searchMovies('batman', 2)

    expect(captured!.searchParams.get('apikey')).toBe('test-key')
    expect(captured!.searchParams.get('s')).toBe('batman')
    expect(captured!.searchParams.get('page')).toBe('2')
    expect(res.Search).toHaveLength(1)
    expect(res.totalResults).toBe('1')
  })

  it('Response가 False인 결과 없음 응답을 그대로 반환한다', async () => {
    server.use(
      http.get('https://www.omdbapi.com/', () =>
        HttpResponse.json({ Response: 'False', Error: 'Movie not found!' })
      )
    )
    const res = await searchMovies('zzzzzz', 1)
    expect(res.Response).toBe('False')
    expect(res.Search).toBeUndefined()
  })
})

describe('getMovieDetail', () => {
  it('apikey, i 쿼리로 요청하고 상세를 반환한다', async () => {
    let captured: URL | null = null
    server.use(
      http.get('https://www.omdbapi.com/', ({ request }) => {
        captured = new URL(request.url)
        return HttpResponse.json({
          Title: 'Batman',
          imdbID: 'tt0372784',
          Response: 'True'
        })
      })
    )

    const res = await getMovieDetail('tt0372784')

    expect(captured!.searchParams.get('apikey')).toBe('test-key')
    expect(captured!.searchParams.get('i')).toBe('tt0372784')
    expect(res.Title).toBe('Batman')
  })
})

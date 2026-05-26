import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { server } from '@/test/msw/server'
import { renderWithRouter } from '@/test/utils'
import { MovieDetailPage } from './MovieDetailPage'

const routes = [{ path: '/movie/:imdbID', element: <MovieDetailPage /> }]

describe('MovieDetailPage', () => {
  it('상세를 불러와 표시한다', async () => {
    renderWithRouter(routes, '/movie/tt0372784')
    expect(await screen.findByText('Movie Detail')).toBeInTheDocument()
    expect(screen.getByText(/IMDb 8.0/)).toBeInTheDocument()
  })

  it('에러 응답이면 에러와 목록 링크를 보여준다', async () => {
    server.use(
      http.get('https://www.omdbapi.com/', () =>
        HttpResponse.json({}, { status: 500 })
      )
    )
    renderWithRouter(routes, '/movie/tt0000000')
    expect(
      await screen.findByText('상세 정보를 불러오지 못했습니다')
    ).toBeInTheDocument()
  })
})

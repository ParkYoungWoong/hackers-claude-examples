import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { server } from '@/test/msw/server'
import { renderWithRouter } from '@/test/utils'
import { HomePage } from './HomePage'
import { MovieDetailPage } from './MovieDetailPage'

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/movie/:imdbID', element: <MovieDetailPage /> }
]

describe('HomePage 통합', () => {
  it('검색 전에는 안내 문구를 보여준다', () => {
    renderWithRouter(routes, '/')
    expect(screen.getByText('검색어를 입력하세요')).toBeInTheDocument()
  })

  it('검색하면 결과 목록을 보여준다', async () => {
    renderWithRouter(routes, '/')
    await userEvent.type(screen.getByRole('textbox'), 'movie')
    await userEvent.click(screen.getByRole('button', { name: '검색' }))

    expect(await screen.findByText('Movie 1')).toBeInTheDocument()
    expect(screen.getByText('Movie 10')).toBeInTheDocument()
  })

  it('URL ?s=로 진입하면 검색 결과가 복원된다', async () => {
    renderWithRouter(routes, '/?s=movie')
    expect(await screen.findByText('Movie 1')).toBeInTheDocument()
  })

  it('결과 없음 응답이면 빈 결과 안내를 보여준다', async () => {
    server.use(
      http.get('https://www.omdbapi.com/', () =>
        HttpResponse.json({ Response: 'False', Error: 'Movie not found!' })
      )
    )
    renderWithRouter(routes, '/?s=zzzzz')
    expect(await screen.findByText('검색 결과가 없습니다')).toBeInTheDocument()
  })

  it('API 에러면 에러 표시를 보여준다', async () => {
    server.use(
      http.get('https://www.omdbapi.com/', () =>
        HttpResponse.json({}, { status: 500 })
      )
    )
    renderWithRouter(routes, '/?s=movie')
    expect(await screen.findByText('검색 중 문제가 발생했습니다')).toBeInTheDocument()
  })

  it('스크롤 sentinel 교차 시 다음 페이지를 누적한다', async () => {
    renderWithRouter(routes, '/?s=movie')
    await screen.findByText('Movie 1')

    // sentinel이 렌더되고 IntersectionObserver가 생성될 때까지 대기
    await waitFor(() => {
      const IO = (globalThis as any).IntersectionObserverMock
      expect(IO.instances.length).toBeGreaterThan(0)
    })

    // 2페이지 로드 트리거
    const IO = (globalThis as any).IntersectionObserverMock
    const inst = IO.instances.at(-1)
    inst.trigger()

    expect(await screen.findByText('Movie 11')).toBeInTheDocument()
  })

  it('목록 항목을 클릭하면 상세 페이지로 이동한다', async () => {
    renderWithRouter(routes, '/?s=movie')
    const firstLink = await screen.findByText('Movie 1')
    await userEvent.click(firstLink)

    expect(await screen.findByText('Movie Detail')).toBeInTheDocument()
    expect(screen.getByText('목록으로')).toBeInTheDocument()
  })
})

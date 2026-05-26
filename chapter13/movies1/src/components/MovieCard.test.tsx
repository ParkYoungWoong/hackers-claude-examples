import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '@/test/utils'
import { MovieCard } from './MovieCard'
import type { MovieSummary } from '@/types/movie'

function setup(movie: MovieSummary) {
  renderWithRouter([{ path: '/', element: <MovieCard movie={movie} /> }], '/')
}

describe('MovieCard', () => {
  it('제목, 연도를 렌더하고 상세 링크를 가진다', () => {
    setup({
      Title: 'Batman',
      Year: '2005',
      imdbID: 'tt0372784',
      Type: 'movie',
      Poster: 'https://x/p.jpg'
    })

    expect(screen.getByText('Batman')).toBeInTheDocument()
    expect(screen.getByText('2005')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/movie/tt0372784')
  })

  it('포스터가 N/A이면 placeholder 이미지를 쓴다', () => {
    setup({
      Title: 'No Poster',
      Year: '2020',
      imdbID: 'tt1',
      Type: 'movie',
      Poster: 'N/A'
    })

    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', expect.stringContaining('placeholder'))
  })
})

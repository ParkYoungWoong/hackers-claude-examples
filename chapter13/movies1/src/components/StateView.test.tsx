import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Loader, ErrorMessage, EmptyState } from './StateView'

describe('StateView', () => {
  it('Loader는 로딩 표시를 렌더한다', () => {
    render(<Loader />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('ErrorMessage는 메시지를 렌더한다', () => {
    render(<ErrorMessage message="문제가 발생했습니다" />)
    expect(screen.getByText('문제가 발생했습니다')).toBeInTheDocument()
  })

  it('EmptyState는 안내 문구를 렌더한다', () => {
    render(<EmptyState message="검색어를 입력하세요" />)
    expect(screen.getByText('검색어를 입력하세요')).toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('children을 버튼 라벨로 렌더링한다', () => {
    render(<Button>삭제</Button>)
    expect(screen.getByRole('button', { name: '삭제' })).toBeInTheDocument()
  })

  it('variant에 맞는 클래스를 적용한다', () => {
    render(<Button variant="danger">삭제</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn--danger')
  })
})

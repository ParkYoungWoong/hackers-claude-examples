import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App 로컬 스토리지 영속화', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('마운트 시 로컬 스토리지에 저장된 할 일을 화면에 보여준다', () => {
    localStorage.setItem(
      'todos',
      JSON.stringify([{ id: '1', text: '우유 사기' }])
    )

    render(<App />)

    expect(screen.getByText('우유 사기')).toBeInTheDocument()
  })

  it('로컬 스토리지 값이 잘못된 JSON이어도 빈 목록으로 시작한다', () => {
    localStorage.setItem('todos', 'not json')

    render(<App />)

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
  })

  it('로컬 스토리지 값이 배열이 아닌 JSON이어도 빈 목록으로 시작한다', () => {
    localStorage.setItem('todos', 'null')

    render(<App />)

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
  })

  it('할 일을 삭제하면 로컬 스토리지에서도 사라진다', async () => {
    localStorage.setItem(
      'todos',
      JSON.stringify([{ id: '1', text: '우유 사기' }])
    )

    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: '삭제' }))

    expect(JSON.parse(localStorage.getItem('todos') ?? '[]')).toEqual([])
  })
})

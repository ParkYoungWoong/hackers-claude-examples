import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoItem from './TodoItem'

const todo = { id: '1', text: '우유 사기' }

function renderItem(overrides = {}) {
  const props = {
    todo,
    onDelete: vi.fn(),
    onEdit: vi.fn().mockResolvedValue(undefined),
    ...overrides
  }
  render(
    <ul>
      <TodoItem {...props} />
    </ul>
  )
  return props
}

describe('TodoItem', () => {
  it('삭제 버튼을 누르면 해당 id로 onDelete를 호출한다', async () => {
    const { onDelete } = renderItem()

    await userEvent.click(screen.getByRole('button', { name: '삭제' }))

    expect(onDelete).toHaveBeenCalledWith('1')
  })

  it('수정 버튼을 누르면 입력창으로 바뀐다', async () => {
    renderItem()

    await userEvent.click(screen.getByRole('button', { name: '수정' }))

    expect(screen.getByRole('textbox')).toHaveValue('우유 사기')
  })

  it('내용을 고치고 저장하면 트림된 값으로 onEdit를 호출한다', async () => {
    const { onEdit } = renderItem()

    await userEvent.click(screen.getByRole('button', { name: '수정' }))
    const input = screen.getByRole('textbox')
    await userEvent.clear(input)
    await userEvent.type(input, '  계란 사기  ')
    await userEvent.click(screen.getByRole('button', { name: '저장' }))

    expect(onEdit).toHaveBeenCalledWith('1', '계란 사기')
  })

  it('저장이 끝나면 다시 일반 항목으로 표시한다', async () => {
    renderItem()

    await userEvent.click(screen.getByRole('button', { name: '수정' }))
    await userEvent.type(screen.getByRole('textbox'), '!')
    await userEvent.click(screen.getByRole('button', { name: '저장' }))

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: '수정' })).toBeInTheDocument()
  })
})

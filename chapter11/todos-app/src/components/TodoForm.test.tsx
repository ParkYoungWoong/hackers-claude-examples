import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoForm from './TodoForm'

describe('TodoForm', () => {
  it('입력 후 추가하면 트림된 값으로 onSubmit을 호출한다', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    render(
      <TodoForm
        isSaving={false}
        onSubmit={onSubmit}
      />
    )

    await userEvent.type(screen.getByRole('textbox'), '  우유 사기  ')
    await userEvent.click(screen.getByRole('button', { name: '추가' }))

    expect(onSubmit).toHaveBeenCalledWith('우유 사기')
  })

  it('공백만 입력하면 onSubmit을 호출하지 않는다', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    render(
      <TodoForm
        isSaving={false}
        onSubmit={onSubmit}
      />
    )

    await userEvent.type(screen.getByRole('textbox'), '   ')
    await userEvent.click(screen.getByRole('button', { name: '추가' }))

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('저장 중에는 입력과 버튼을 비활성화한다', () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    render(
      <TodoForm
        isSaving={true}
        onSubmit={onSubmit}
      />
    )

    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(screen.getByRole('button')).toBeDisabled()
  })
})

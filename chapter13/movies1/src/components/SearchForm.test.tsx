import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchForm } from './SearchForm'

describe('SearchForm', () => {
  it('입력 후 제출하면 검색어로 onSearch를 호출한다', async () => {
    const onSearch = vi.fn()
    render(
      <SearchForm
        onSearch={onSearch}
        initialQuery=""
      />
    )

    await userEvent.type(screen.getByRole('textbox'), 'batman')
    await userEvent.click(screen.getByRole('button', { name: '검색' }))

    expect(onSearch).toHaveBeenCalledWith('batman')
  })

  it('빈 입력은 onSearch를 호출하지 않는다', async () => {
    const onSearch = vi.fn()
    render(
      <SearchForm
        onSearch={onSearch}
        initialQuery=""
      />
    )

    await userEvent.click(screen.getByRole('button', { name: '검색' }))

    expect(onSearch).not.toHaveBeenCalled()
  })
})

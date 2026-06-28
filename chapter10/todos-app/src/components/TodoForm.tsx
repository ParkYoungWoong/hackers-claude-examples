import { useState, type FormEvent } from 'react'

type Props = {
  isSaving: boolean
  onSubmit: (text: string) => Promise<void>
}

function TodoForm({ isSaving, onSubmit }: Props) {
  const [input, setInput] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || isSaving) return
    await onSubmit(text)
    setInput('')
  }

  return (
    <form
      className="todo-form"
      onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="할 일을 입력하세요"
        className="todo-input"
        disabled={isSaving}
      />
      <button
        type="submit"
        className="todo-add"
        disabled={isSaving}>
        {isSaving ? (
          <span
            className="spinner"
            aria-label="저장 중"
          />
        ) : (
          '추가'
        )}
      </button>
    </form>
  )
}

export default TodoForm

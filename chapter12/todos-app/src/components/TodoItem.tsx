import { useState, type FormEvent } from 'react'
import type { Todo } from '../types'
import Button from './Button'

type Props = {
  todo: Todo
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => Promise<void>
}

function TodoItem({ todo, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  const [isSaving, setIsSaving] = useState(false)

  const startEdit = () => {
    setDraft(todo.text)
    setIsEditing(true)
  }

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text || isSaving) return
    setIsSaving(true)
    await onEdit(todo.id, text)
    setIsSaving(false)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <li className="todo-item">
        <form
          className="todo-edit"
          onSubmit={handleSave}>
          <input
            type="text"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            className="todo-input"
            disabled={isSaving}
            autoFocus
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
              '저장'
            )}
          </button>
        </form>
      </li>
    )
  }

  return (
    <li className="todo-item">
      <span className="todo-item__text">{todo.text}</span>
      <Button
        variant="secondary"
        size="small"
        icon="edit"
        aria-label="수정"
        onClick={startEdit}
      />
      <Button
        variant="danger"
        size="small"
        icon="delete"
        aria-label="삭제"
        onClick={() => onDelete(todo.id)}
      />
    </li>
  )
}

export default TodoItem

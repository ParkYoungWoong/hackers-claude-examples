import { useEffect, useState } from 'react'

interface Todo {
  id: string
  text: string
}

const STORAGE_KEY = 'todos'

export default function App() {
  // 첫 렌더링 시 localStorage에서 저장된 할 일을 읽어옵니다.
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })
  const [input, setInput] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')

  // todos가 바뀔 때마다 localStorage에 저장합니다.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function addTodo(event: React.FormEvent) {
    event.preventDefault()
    const text = input.trim()
    if (!text) return
    setTodos([...todos, { id: crypto.randomUUID(), text }])
    setInput('')
  }

  function deleteTodo(id: string) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function startEdit(todo: Todo) {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  function saveEdit(event: React.FormEvent) {
    event.preventDefault()
    const text = editText.trim()
    if (!text) return
    setTodos(
      todos.map(todo => (todo.id === editingId ? { ...todo, text } : todo))
    )
    setEditingId(null)
    setEditText('')
  }

  function cancelEdit() {
    setEditingId(null)
    setEditText('')
  }

  return (
    <div>
      <h1>Todo List</h1>

      <form onSubmit={addTodo}>
        <input
          type="text"
          value={input}
          onChange={event => setInput(event.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <button type="submit">추가</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <form onSubmit={saveEdit}>
                <input
                  type="text"
                  value={editText}
                  onChange={event => setEditText(event.target.value)}
                />
                <button type="submit">저장</button>
                <button
                  type="button"
                  onClick={cancelEdit}>
                  취소
                </button>
              </form>
            ) : (
              <>
                <span>{todo.text}</span>
                <button
                  type="button"
                  onClick={() => startEdit(todo)}>
                  수정
                </button>
                <button
                  type="button"
                  onClick={() => deleteTodo(todo.id)}>
                  삭제
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

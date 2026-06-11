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
    <main className="app">
      <header className="app__head">
        <h1 className="app__title">
          TO<em>DOS</em>
        </h1>
        <p className="app__sub">할 일 관리 // localStorage 저장</p>
      </header>

      <div className="counter">
        <span>TASKS</span>
        <span>
          <b>{String(todos.length).padStart(2, '0')}</b> 개
        </span>
      </div>

      <form
        className="add"
        onSubmit={addTodo}>
        <input
          className="field"
          type="text"
          value={input}
          onChange={event => setInput(event.target.value)}
          placeholder="새로운 할 일을 입력..."
        />
        <button
          className="btn btn--add"
          type="submit">
          추가
        </button>
      </form>

      {todos.length === 0 ? (
        <div className="empty">
          <b>비어 있음</b>
          <span>첫 번째 할 일을 추가하세요</span>
        </div>
      ) : (
        <ul className="list">
          {todos.map((todo, index) => (
            <li
              className="item"
              key={todo.id}>
              {editingId === todo.id ? (
                <form
                  className="edit"
                  onSubmit={saveEdit}>
                  <input
                    className="field"
                    type="text"
                    value={editText}
                    onChange={event => setEditText(event.target.value)}
                    autoFocus
                  />
                  <button
                    className="btn btn--sm btn--save"
                    type="submit">
                    저장
                  </button>
                  <button
                    className="btn btn--sm"
                    type="button"
                    onClick={cancelEdit}>
                    취소
                  </button>
                </form>
              ) : (
                <>
                  <span className="item__num">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="item__text">{todo.text}</span>
                  <div className="item__actions">
                    <button
                      className="btn btn--sm btn--edit"
                      type="button"
                      onClick={() => startEdit(todo)}>
                      수정
                    </button>
                    <button
                      className="btn btn--sm btn--del"
                      type="button"
                      onClick={() => deleteTodo(todo.id)}>
                      삭제
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      <footer className="foot">★ STORED IN YOUR BROWSER ★</footer>
    </main>
  )
}

import { useState, type FormEvent } from 'react'
import './App.css'

type Todo = {
  id: string
  text: string
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setTodos([...todos, { id: crypto.randomUUID(), text }])
    setInput('')
  }

  return (
    <div className="app">
      <h1>할 일 목록</h1>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일을 입력하세요"
          className="todo-input"
        />
        <button type="submit" className="todo-add">
          추가
        </button>
      </form>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

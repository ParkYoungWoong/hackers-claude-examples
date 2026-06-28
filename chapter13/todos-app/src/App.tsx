import { useState } from 'react'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import type { Todo } from './types'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isSaving, setIsSaving] = useState(false)

  const addTodo = (text: string) =>
    new Promise<void>((resolve) => {
      setIsSaving(true)
      setTimeout(() => {
        setTodos((prev) => [...prev, { id: crypto.randomUUID(), text }])
        setIsSaving(false)
        resolve()
      }, 1000)
    })

  return (
    <div className="app">
      <h1>할 일 목록</h1>
      <TodoForm isSaving={isSaving} onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  )
}

export default App

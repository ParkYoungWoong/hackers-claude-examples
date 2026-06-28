import { useEffect, useState } from 'react'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import type { Todo } from './types'

const STORAGE_KEY = 'todos'

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return []
      const parsed: unknown = JSON.parse(raw)
      return Array.isArray(parsed) ? (parsed as Todo[]) : []
    } catch {
      return []
    }
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string) =>
    new Promise<void>(resolve => {
      setIsSaving(true)
      setTimeout(() => {
        setTodos(prev => [...prev, { id: crypto.randomUUID(), text }])
        setIsSaving(false)
        resolve()
      }, 1000)
    })

  const deleteTodo = (id: string) =>
    setTodos(prev => prev.filter(todo => todo.id !== id))

  const editTodo = (id: string, text: string) =>
    new Promise<void>(resolve => {
      setTimeout(() => {
        setTodos(prev =>
          prev.map(todo => (todo.id === id ? { ...todo, text } : todo))
        )
        resolve()
      }, 1000)
    })

  return (
    <div className="app">
      <h1>할 일 목록</h1>
      <TodoForm
        isSaving={isSaving}
        onSubmit={addTodo}
      />
      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  )
}

export default App

import type { Todo } from '../types'

type Props = {
  todos: Todo[]
}

function TodoList({ todos }: Props) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          {todo.text}
        </li>
      ))}
    </ul>
  )
}

export default TodoList

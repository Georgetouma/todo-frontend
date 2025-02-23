import { Todo } from "@/utils/api";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <div>
      <h2>{todo.description}</h2>
      <p>Priority: {todo.priority}</p>
      <p>Date: {new Date(todo.date).toLocaleDateString()}</p>
      <p>{todo.completed ? 'Completed' : 'Pending'}</p>
    </div>
  );
}
import { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from '@/components/todos';
import { Todo } from '@/utils/api';

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('/api/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Failed to fetch todos', error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      {todos.length > 0 ? (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      ) : (
        <p>No todos found. Add a new todo!</p>
      )}
      <button onClick={() => (window.location.href = '/todos/new')}>
        Add Todo
      </button>
    </div>
  );
}
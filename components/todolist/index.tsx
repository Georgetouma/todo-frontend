

"use client";

import { useState, useEffect } from 'react';
import TodoItem from '../todos';
import AddTodoModal from '../addtodo';

// Define the Todo type
interface Todo {
  id: number;
  description: string;
  priority: number;
  date: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  useEffect(() => {
   
  }, []);

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };


  const addTodo = (description: string, priority: number, date: string) => {
    const isoDate = new Date(date).toISOString();


    const newTodo: Todo = {
      id: Date.now(),
      description,
      priority,
      date: isoDate,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    console.log('New Todo Added:', newTodo);
  };

  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />
      ))}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Todo
      </button>
      <AddTodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTodo={addTodo}
      />
    </div>
  );
}

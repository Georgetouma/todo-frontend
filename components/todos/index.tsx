"use client";
import { Todo } from '@/utils/api';

interface TodoProps {
  todo: Todo;
  deleteTodo: (id: number) => void;
}

export default function TodoItem({ todo, deleteTodo }: TodoProps) {
  return (
    <div
      key={todo.id}
      className="flex flex-col md:flex-row items-center justify-between p-2.5 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 mb-4"
    >
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{todo.description}</h3>
        <div className="text-sm text-gray-500 mt-1">
          <h1 className="font-medium text-gray-700">Priority: {todo.priority} </h1> 

          <span className="font-medium text-gray-700">Date:</span> {new Date(todo.date).toLocaleDateString()}
        </div>
      </div>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="mt-2 md:mt-0 ml-0 md:ml-4 text-red-500 hover:text-red-700 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4a1 1 0 011 1v2H9V4a1 1 0 011-1z"
          />
        </svg>
      </button>
    </div>
  );
}

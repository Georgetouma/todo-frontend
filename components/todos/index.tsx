'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import TodoCard from './TodoCard';

export default function TodoList() {
  const { data: todos, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => api.get('/todo').then(res => res.data),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading todos</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {todos?.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
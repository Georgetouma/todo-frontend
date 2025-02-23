import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
export interface Todo {
  id: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  date: string;
  completed: boolean;
}
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getTodos = async () => {
  const response = await api.get('/todos');
  return response.data;
};

export const createTodo = async (todo: Omit<Todo, 'id'>) => {
  const response = await api.post('/todos', todo);
  return response.data;
};

export const updateTodo = async (id: string, todo: Partial<Todo>) => {
  const response = await api.put(`/todos/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id: string) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};
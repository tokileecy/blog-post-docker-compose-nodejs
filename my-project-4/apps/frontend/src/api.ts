import axios from 'axios';

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_BACKEND_URL,
  timeout: 10_000,
});

export interface Todo {
  id: number;
  name: string;
  completed: boolean;
}

const api = {
  listTodos() {
    return apiInstance.get<Todo[]>('/todos');
  },

  createTodo(data: { name: string }) {
    return apiInstance.post<Todo>('/todos', data);
  },

  completeTodo(id: number) {
    return apiInstance.post<void>(`/todos/${id}/complete`);
  },

  updateTodo(id: number, data: { name: string }) {
    return apiInstance.put(`/todos/${id}`, data);
  },

  deleteTodo(id: number) {
    return apiInstance.delete(`/todos/${id}`);
  },
};

export default api;

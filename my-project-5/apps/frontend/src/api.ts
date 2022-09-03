import axios from 'axios';

declare global {
  interface Window {
    REACT_APP_PUBLIC_BACKEND_URL?: string;
  }
}

const apiInstance = axios.create({
  baseURL: '',
  timeout: 10_000,
});

export interface Todo {
  id: number;
  name: string;
  completed: boolean;
}

const api = {
  async refreshBackendURL() {
    try {
      if (process.env.NODE_ENV === 'production') {
        const res = await axios.get(
          `backend-url.${process.env.REACT_APP_BUILD_HASH}.txt`,
        );
        apiInstance.defaults.baseURL = res.data as string;
      } else {
        apiInstance.defaults.baseURL = process.env.REACT_APP_PUBLIC_BACKEND_URL;
      }
    } catch (error) {
      console.error(error);
    }
  },

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

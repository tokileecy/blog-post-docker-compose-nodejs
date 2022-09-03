import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import './App.css';
import api, { Todo } from './api';
import TodoItem from './TodoItem';

interface TodoStates {
  ids: number[];
  items: Record<number, Todo>;
}

function App() {
  const [inputTodo, setInputTodo] = useState('');
  const [todoStates, setTodoStates] = useState<TodoStates>({
    ids: [],
    items: {},
  });

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputTodo(e.target.value);
  };

  const fetchTodos = async () => {
    try {
      const res = await api.listTodos();

      setTodoStates(() => {
        const next: TodoStates = {
          ids: [],
          items: {},
        };

        for (const todoList of res.data) {
          next.ids.push(todoList.id);
          next.items[todoList.id] = todoList;
        }
        return next;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleComplete = async (id: number) => {
    try {
      await api.completeTodo(id);
      await fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deleteTodo(id);
      await fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      await api.createTodo({ name: inputTodo });
      await fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await api.refreshBackendURL();
      await fetchTodos();
    };
    init();
  }, []);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <section className="todo-root">
        <div className="todo-form-container">
          <form className="todo-form" onSubmit={handleSubmit}>
            <input
              className="todo-form-input"
              value={inputTodo}
              onChange={handleInputChange}
            />
            <input className="todo-form-submit" type="submit" />
          </form>
        </div>
        <div className="todo-items-container">
          <ul className="todo-items-root">
            {todoStates.ids.map((id) => (
              <TodoItem
                key={id}
                item={todoStates.items[id]}
                onComplete={handleComplete}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;

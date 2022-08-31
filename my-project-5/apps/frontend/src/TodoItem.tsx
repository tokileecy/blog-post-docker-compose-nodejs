import clsx from 'clsx';
import { Todo } from './api';
import './TodoItem.css';

export interface TodoItemProps {
  item: Todo;
  onComplete?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function TodoItem(props: TodoItemProps) {
  const { item, onComplete, onDelete } = props;
  return (
    <li className={'todo-item-root'}>
      <input
        className="todo-item-checkbox"
        type="checkbox"
        disabled={item.completed}
        checked={item.completed}
        onChange={() => {
          onComplete?.(item.id);
        }}
      />
      <div
        className={clsx('todo-item', {
          completed: item.completed,
        })}
      >
        <span className="todo-item-name">{item.name}</span>
        <button
          className="todo-item-delete-btn"
          onClick={() => {
            onDelete?.(item.id);
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

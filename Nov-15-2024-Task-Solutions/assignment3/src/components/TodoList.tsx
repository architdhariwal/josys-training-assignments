import React from 'react';
import { Todo } from '../App';
import '../styles/TodoList.css';

interface TodoListProps {
  todos: Todo[];
  onDeleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDeleteTodo }) => {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div key={todo.id} className="todo-item">
          <span className="todo-text">{todo.text}</span>
          <button
            onClick={() => onDeleteTodo(todo.id)}
            className="delete-button"
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
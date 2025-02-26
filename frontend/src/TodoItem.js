import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const TodoItem = ({ todo, fetchTodos }) => {
  const [editing, setEditing] = useState(false);
  const [editingText, setEditingText] = useState(todo.title);

  const toggleTodo = async () => {
    try {
      await axios.patch(`http://localhost:5000/todos/${todo._id}`, { completed: !todo.completed });
      fetchTodos();
    } catch (error) {
      console.error('Error toggling todo', error);
      alert('Error toggling todo');
    }
  };

  const deleteTodo = async () => {
    try {
      await axios.delete(`http://localhost:5000/todos/${todo._id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo', error);
      alert('Error deleting todo');
    }
  };

  const startEditing = () => {
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
    setEditingText(todo.title);
  };

  const updateTodo = async () => {
    if (!editingText.trim()) {
      alert('Please enter a task');
      return;
    }
    try {
      await axios.patch(`http://localhost:5000/todos/${todo._id}`, { title: editingText });
      fetchTodos();
      setEditing(false);
    } catch (error) {
      console.error('Error updating todo', error);
      alert('Error updating todo');
    }
  };

  return (
    <li>
      {editing ? (
        <div className="editing">
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
          />
          <button onClick={updateTodo}>Save</button>
          <button onClick={cancelEditing}>Cancel</button>
        </div>
      ) : (
        <div className="task-item">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={toggleTodo}
          />
          <span className={todo.completed ? 'completed' : ''}>
            {todo.title}
          </span>
          <div className="buttons">
            <button className="edit" onClick={startEditing}>Edit</button>
            <button onClick={deleteTodo}>Delete</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
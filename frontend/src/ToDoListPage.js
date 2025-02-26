import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import { useNavigate } from 'react-router-dom';
import './App.css';

const TodoListPage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos', error);
      alert('Error fetching todos');
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) {
      alert('Please enter a task');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/todos', { title: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo', error);
      alert('Error adding todo');
    }
  };

  return (
    <div id="app-bg">
      <div className="App">
        <div className="add-todo">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task"
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <ul>
          {todos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              fetchTodos={fetchTodos}
            />
          ))}
        </ul>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default TodoListPage;
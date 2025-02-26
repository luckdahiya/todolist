import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddTodoPage = () => {
  const [newTodo, setNewTodo] = useState('');
  const navigate = useNavigate();

  const addTodo = async () => {
    if (!newTodo) {
      console.log('Input is empty!');
      return;
    }
    try {
      await axios.post('http://localhost:5000/todos', { title: newTodo });
      navigate('/'); // Navigate to home after adding the todo
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div>
      <h2>Add New Todo</h2>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)} // Update the state on typing
        placeholder="Enter new task"
      />
      <button onClick={addTodo}>Add</button> {/* Add todo button */}
      {/* Button to navigate back to the To-Do list page */}
      <button onClick={() => navigate('/')}>Go to Todo List</button>
    </div>
  );
};

export default AddTodoPage;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditTodoPage = () => {
  const [todo, setTodo] = useState(null);
  const [editingText, setEditingText] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/todos/${id}`);
        setTodo(response.data);
        setEditingText(response.data.title);
      } catch (error) {
        console.error('Error fetching todo:', error);
      }
    };
    fetchTodo();
  }, [id]);

  const updateTodo = async () => {
    if (!editingText) return;
    try {
      await axios.patch(`http://localhost:5000/todos/${id}`, { title: editingText });
      navigate('/');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  if (!todo) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Todo</h2>
      <input
        type="text"
        value={editingText}
        onChange={(e) => setEditingText(e.target.value)}
      />
      <button onClick={updateTodo}>Save Changes</button>
    </div>
  );
};

export default EditTodoPage;

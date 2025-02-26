import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <h1>Welcome to Your To-Do List</h1>
      <p>What's new plans today?</p>
      <button onClick={() => navigate('/tasks')}>Write them down</button>
    </div>
  );
};

export default HomePage;
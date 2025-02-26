import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import TodoListPage from './ToDoListPage';
import './Dom.css';

const Dom = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks" element={<TodoListPage />} />
      </Routes>
    </Router>
  );
};

export default Dom;
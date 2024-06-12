import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import inicio from './pages/inicio.js';
import login from './pages/login.js';

function App() {

  const isAuthenticated = !!localStorage.getItem('user');

  return (
    <Router>
      <Routes>
        <Route path='/' Component={inicio}/>
        {isAuthenticated ? (
          <Route path='/login' element={<Navigate to="/" />} />
        ):(<Route path='/login' Component={login}/>)}
        
      </Routes>
    </Router>
  );
}

export default App;

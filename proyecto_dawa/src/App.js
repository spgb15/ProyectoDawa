import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import inicio from './pages/inicio.js';
import login from './pages/login.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={inicio}/>
        <Route path='/login' Component={login}/>
      </Routes>
    </Router>
  );
}

export default App;

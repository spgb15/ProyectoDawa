import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import inicio from './pages/inicio.js';
import login from './pages/login.js';
import Precios from './pages/precios.js';
import Nosotros from './pages/nosotros.js';
import Contactanos from './pages/contactanos.js';


function App() {

  const isAuthenticated = !!localStorage.getItem('user');
  
  return (
    <Router>
      <Routes>
        <Route path='/' Component={inicio}/>
        {isAuthenticated ? (
          <Route path='/login' element={<Navigate to="/" />} />
        ):(<Route path='/login' Component={login}/>)}
        <Route path='/precios' Component={Precios}/>
        <Route path='/nosotros' Component={Nosotros}/>
        <Route path='/contacto' Component={Contactanos}/>
      </Routes>
    </Router>
  );
}

export default App;

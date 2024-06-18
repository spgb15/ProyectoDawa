import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import inicio from './pages/inicio.js';
import login from './pages/login.js';
import Precios from './pages/precios.js';
import Factura from './pages/factura.js';
import EstadoCliente from './pages/estado.js';
import EstadoTecnico from './pages/estadoTecnico.js';
import EstadoAdmin from './pages/estadoAdmin.js';

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
        <Route path='/factura' Component={Factura}/>
        <Route path='/estadoCliente' Component={EstadoCliente}/>
        <Route path='/estadoTecnico' Component={EstadoTecnico}/>
        <Route path='/estadoAdmin' Component={EstadoAdmin}/>
      </Routes>
    </Router>
  );
}

export default App;

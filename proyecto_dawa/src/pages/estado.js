import React from'react';

import Navegacion from '../components/navbar.jsx';
import EstadoAdministrador from '../components/from_estadoAdmin.jsx';
import EstadoCliente from '../components/from_estadoCliente.jsx';
import Footer from '../components/footer.jsx';

function Estados() {


  return (
    <div>
      <Navegacion></Navegacion>
      <EstadoCliente></EstadoCliente>
      <Footer></Footer>
    </div>

)}

export default Estados;

import React from "react";
import Navegacion from '../components/navbar.jsx';
import FooterPage from '../components/footer.jsx';
import EstadoCliente from "../components/from_estadoCliente.jsx";

export default function Estado(){
    return(
        <div>
            <Navegacion></Navegacion>
            <br/>
            <EstadoCliente></EstadoCliente>
            <FooterPage></FooterPage>
        </div>
    );
}
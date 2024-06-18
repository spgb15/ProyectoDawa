import React from "react";
import Navegacion from '../components/navbar.jsx';
import FooterPage from '../components/footer.jsx';
import EstadoTecnico from "../components/from_estadoTecnico.jsx";

export default function EstadoT(){
    return(
        <div>
            <Navegacion></Navegacion>
            <br/>
            <EstadoTecnico></EstadoTecnico>
            <FooterPage></FooterPage>
        </div>
    );
}
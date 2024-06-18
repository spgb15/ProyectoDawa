import React from "react";
import Navegacion from '../components/navbar.jsx';
import FooterPage from '../components/footer.jsx';
import EstadoAdmin from "../components/from_estadoAdmin.jsx";

export default function Estado(){
    return(
        <div>
            <Navegacion></Navegacion>
            <br/>
            <EstadoAdmin></EstadoAdmin>
            <FooterPage></FooterPage>
        </div>
    );
}
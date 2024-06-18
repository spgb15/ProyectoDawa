import React from "react";
import Navegacion from '../components/navbar.jsx';
import FooterPage from '../components/footer.jsx';
import Nosotros from "../components/acerca_de.jsx";

export default function AcercaDe(){
    return(
        <div>
            <Navegacion></Navegacion>
            <br/>
            <Nosotros></Nosotros>
            <FooterPage></FooterPage>
        </div>
    );
}
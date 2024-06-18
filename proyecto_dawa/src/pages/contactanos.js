import React from "react";
import Navegacion from '../components/navbar.jsx';
import FooterPage from '../components/footer.jsx';
import Contacta from "../components/contacta.jsx";

export default function Contactanos(){
    return(
        <div>
            <Navegacion></Navegacion>
            <br/>
            <Contacta></Contacta>
            <FooterPage></FooterPage>
        </div>
    );
}
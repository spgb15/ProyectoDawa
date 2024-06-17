import React from "react";
import Navegacion from '../components/navbar.jsx';
import FooterPage from '../components/footer.jsx';
import Repuestos from "../components/repuestos";

export default function Precios(){
    return(
        <div>
            <Navegacion></Navegacion>
            <br/>
            <Repuestos></Repuestos>
            <FooterPage></FooterPage>
        </div>
    );
}
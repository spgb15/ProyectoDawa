import React from "react";
import Navegacion from '../components/navbar.jsx';
import FooterPage from '../components/footer.jsx';
import FacturaTable from "../components/from_factura";

export default function Factura(){
    return(
        <div>
            <Navegacion></Navegacion>
            <br/>
            <FacturaTable></FacturaTable>
            <FooterPage></FooterPage>
        </div>
    );
}
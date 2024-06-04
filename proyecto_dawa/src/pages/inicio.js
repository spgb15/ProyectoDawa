import React from "react";
import Navegacion from '../components/navbar.jsx'
import FooterPage from '../components/footer.jsx'
import { dividerClasses } from "@mui/material";

export default function () {

    return (
        <div>
            <Navegacion></Navegacion>
            <FooterPage></FooterPage>
        </div>
    );
}
import React from "react";
import Navegacion from '../components/navbar.jsx';
import FooterPage from '../components/footer.jsx';
import Carousel from "../components/carrousel.jsx";

export default function () {

    return (
        <div>
            <Navegacion></Navegacion>
            <Carousel></Carousel>
            <FooterPage></FooterPage>
        </div>
    );
}
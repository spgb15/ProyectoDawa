import React from "react";
import Navegacion from '../components/navbar.jsx'

export default function () {
    const pages = [
        { title: 'Inicio', path: '/' },
        { title: 'Servicios' },
        { title: 'Acerca de nosotros', path: '/nosotros' },
        { title: 'Contactanos', path: '/contacto' }
    ];

    const settings = [
        { title: 'Login', path: '/login' },
        { title: 'Registro', path: '/register' }
    ];

    const services = [
        { title: 'Precios de los repuestos', path: '/precios' },
        { title: 'Estado de la reparación', path: '/estado' }
    ];

    return (
        <Navegacion 
            pages={pages} 
            settings={settings} 
            services={services}
        >
        </Navegacion>
    );
}
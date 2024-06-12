import React from "react";
import Login_form from '../components/form_login';
import Navegacion from '../components/navbar.jsx';
import '../styles/page_login.css';

export default function Login() {
    return (
        <div className="contenedor_login">
            <Navegacion></Navegacion>
            <Login_form></Login_form>
        </div>
    );
}
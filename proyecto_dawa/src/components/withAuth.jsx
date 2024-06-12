import React from "react";
import { Redirect } from "react-router-dom";

const withAuth = (WrappedComponent) => {
    return(props) => {
        const user = JSON.parse(localStorage.getItem('user'));

        if(!user){
            return <Redirect to="/login"/>
        }

        return <WrappedComponent {...props} user={user}/>
    };
};

export default withAuth;
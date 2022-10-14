import React from 'react'
import { Redirect, Route } from "react-router-dom";
export default function PrivateRouteNewPassword({
    component: Component,isLogged,
    ...rest
  }) {

    return (
      <Route {...rest}>
        {isLogged.rol === "Administrador" ? <Component /> : <Redirect to="/Dashboard" />}
      </Route>
    );
}

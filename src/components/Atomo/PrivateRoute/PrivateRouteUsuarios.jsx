import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRouteUsuarios({
    component: Component,
    ...rest
  }) {
    const {  rol } = JSON.parse(localStorage.getItem("isLogger"));

    return (
      <Route {...rest}>
        {rol === "Administrador" || rol === "Gestor de Roles" ? (
          <Component />
        ) : (
          <Redirect to="/Dashboard" />
        )}
      </Route>
    );
}

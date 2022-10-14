import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRouteMovSolicitud({
  component: Component,
  ...rest
}) {
  const { rol } = JSON.parse(localStorage.getItem("isLogger"));

  return (
    <Route {...rest}>
      {rol === "Administrador" ||
      rol === "Solicitante" ||
      rol === "Experto en avalúos" ? (
        <Component />
      ) : (
        <Redirect to="/Dashboard" />
      )}
    </Route>
  );
}

import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRouteBandejaSolicitante({
  component: Component,
  ...rest
}) {
  const { rol } = JSON.parse(localStorage.getItem("isLogger"));

  return (
    <Route {...rest}>
      {rol === "Administrador" || rol === "Cliente" ? (
        <Component />
      ) : //Solicitante
      rol === "Experto en avalúos" ? (
        <Redirect to="/Registro_de_Avaluadores" />
      ) : rol === "Solicitante" ? (
        <Redirect to="/Registro_de_Solicitud" />
      ) : (
        <Redirect to="/Dashboard" />
      )}
    </Route>
  );
}

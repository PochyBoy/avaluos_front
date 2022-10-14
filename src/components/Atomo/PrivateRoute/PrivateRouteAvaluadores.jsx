import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRouteAvaluadores({
  component: Component,
  ...rest
}) {
  const { rol } = JSON.parse(localStorage.getItem("isLogger"));

  return (
    <Route {...rest}>
      {rol === "Administrador" || rol === "Experto en avalúos" ? (
        <Component />
      ) : //Solicitante
      rol === "Solicitante" ? (
        <Redirect to="/Registro_de_Solicitud" />
      ) : // Consultas
      rol === "Consultas" ? (
        <Redirect to="/Dashboard" />
      ) : // Perito en avalúos
      rol === "Perito en avalúos" ? (
        <Redirect to="/Dashboard" />
      ) : (
        //Cliente
        rol === "Cliente" && <Redirect to="/Registrar_visita_y_pago" />
      )}
    </Route>
  );
}

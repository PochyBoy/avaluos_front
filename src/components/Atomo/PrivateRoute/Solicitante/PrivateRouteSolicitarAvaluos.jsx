import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRouteSolicitarAvaluos({
  component: Component,
  isLogged,
  ...rest
}) {
  const { rol } = isLogged;
//   const {  rol } = JSON.parse(localStorage.getItem("isLogger"));
  return (
    <Route {...rest}>
      {rol === "Solicitante" ? <Component /> : <Redirect to="/Dashboard" />}
    </Route>
  );
}

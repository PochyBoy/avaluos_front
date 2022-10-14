import React from "react";
import { Redirect, Route } from "react-router-dom";
export default function PrivateRouteGeneracionReporteExpertoAvaluos({
  component: Component,
  isLogged,
  ...rest
}) {
  const { rol } = isLogged;
  //   const {  rol } = JSON.parse(localStorage.getItem("isLogger"));
  return (
    <Route {...rest}>
      {rol === "Experto en avalúos" ? (
        <Component />
      ) : (
        <Redirect to="/Dashboard" />
      )}
    </Route>
  );
}

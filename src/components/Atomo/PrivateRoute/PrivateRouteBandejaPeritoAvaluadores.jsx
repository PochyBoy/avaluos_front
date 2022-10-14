import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRouteBandejaPeritoAvaluadores({
  component: Component,
  ...rest
}) {
  const { rol } = JSON.parse(localStorage.getItem("isLogger"));

  return (
    <Route {...rest}>
      {rol === "Administrador" || rol === "Experto en avalúos" ? (
        <Component />
      ) : (
        <Redirect to="/Dashboard" />
      )}
    </Route>
  );
}

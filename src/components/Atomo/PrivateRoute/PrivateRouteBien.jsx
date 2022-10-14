import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRouteBien({ component: Component, ...rest }) {
  const {  rol } = JSON.parse(localStorage.getItem("isLogger"));

  return (
    <Route {...rest}>
      {rol === "Administrador" ? <Component /> : <Redirect to="/Dashboard" />}
    </Route>
  );
}

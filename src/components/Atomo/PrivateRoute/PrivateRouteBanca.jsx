import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRouteBanca({ component: Component, ...rest }) {
    const { rol } = JSON.parse(localStorage.getItem("isLogger"));

    return (
      <Route {...rest}>
        {rol === "Administrador"  ? (
          <Component />
        ) : (
          <Redirect to="/Dashboard" />
        )}
      </Route>
    );
}

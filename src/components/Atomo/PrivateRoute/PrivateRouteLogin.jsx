import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRouteLogin({
  component: Component,
  setIsLogged,
  isLogged,
  ...rest
}) {

  return (
    <Route {...rest}>
      {isLogged ? <Redirect to="/Dashboard" /> : <Component setIsLogged={setIsLogged}/>}
    </Route>
  );

}

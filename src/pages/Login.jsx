import React, { useState } from "react";
import { Button } from "primereact/button";
// import classNames from "classnames";
import { InputText } from "primereact/inputtext";

import { useHistory } from "react-router-dom";
// Redux

import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import { DataLogin, LimpiarLogin } from "../store/slices/Login";
import { useEffect } from "react";

export default function Login({ setIsLogged }) {
  let emtpy = {
    email: "",
    password: "",
  };
  // useState
  const [data, setData] = useState(emtpy);
  const dispatch = useDispatch();
  const history = useHistory();
  //Redux useSelector
  const UsuarioLogin = useSelector((state) => state.Login);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (Object.entries(UsuarioLogin.DatoLogeado).length !== 0) {
      let valueLogin = JSON.stringify(UsuarioLogin.DatoLogeado.userData);
      let valueToken = JSON.stringify(UsuarioLogin.DatoLogeado.token);
      localStorage.setItem("isLogger", valueLogin);
      localStorage.setItem("Token", valueToken);
      setIsLogged(UsuarioLogin.DatoLogeado.userData);
      history.push("/Dashboard");
      dispatch(LimpiarLogin());
    }
  }, [UsuarioLogin, dispatch, history, setIsLogged]);
  const handleSubmit = () => {
    if (data.email === "" || data.password === "") {
      return;
    }

    dispatch(DataLogin({ email: data.email, password: data.password }));

    // let valueLogin = JSON.stringify(UsuarioLogin.DatoLogeado.userData);
    // let valor = UsuarioLogin.allLogin.find((item) => item.email === data.email);
    // if (valor) {
    //   valor = [valor].find((item) => item.password === data.password);
    // }
    // if (valor) {
    //   let valueLogin = JSON.stringify(valor);
    //   localStorage.setItem("isLogger", valueLogin);
    //   setIsLogged(valor);
    //   history.push("/Dashboard");
    // }
    // console.log(await UsuarioLogin.DatoLogeado);
  };

  return (
    <div className="centro">
      <div className="flex justify-content-center">
        <div className="grid grid-nogutter surface-section text-800">
          <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
            <section>
              <div className="text-center mb-5">
                <img src="images/blocks/logos/hyper.svg" alt="hyper" />
                <div className="text-900 text-3xl font-medium mb-3">
                  SISTEMA DE AVALUOS
                </div>
              </div>

              <div>
                {/* Correlo Electronico */}
                <label
                  htmlFor="email1"
                  className="block text-900 font-medium mb-2"
                >
                  Email
                </label>
                <InputText
                  id="email"
                  name={"email"}
                  type="text"
                  value={data.email}
                  className="w-full mb-3"
                  onChange={(e) => handleChange(e)}
                />
                {/* Contraseña Establecida */}
                <label
                  htmlFor="password"
                  className="block text-900 font-medium mb-2"
                >
                  Password
                </label>
                <InputText
                  id="password"
                  type="password"
                  name={"password"}
                  value={data.password}
                  className="w-full mb-3"
                  onChange={(e) => handleChange(e)}
                />

                <Button
                  id="submit"
                  name="submit"
                  onClick={handleSubmit}
                  label="Sign In"
                  icon="pi pi-user"
                  className="w-full"
                />
              </div>
            </section>
          </div>
          <div className="col-12 md:col-6 overflow-hidden"></div>
        </div>
      </div>
    </div>
  );
}

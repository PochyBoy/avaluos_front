import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";

import { Password } from "primereact/password";
export default function NewPassword() {
  let empyt = {
    password: "",
    confirmPassword: "",
  };
  const [data, ] = useState(empyt);
  const [, setShowMessage] = useState(false);
  const [datas, setDatas] = useState([]);
  const formik = useFormik({
    initialValues: data || {
      password: "",
      confirmPassword: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.password) {
        errors.password = "Ingrese una nueva contraseña.";
      }

      if (!data.confirmPassword) {
        errors.confirmPassword = "Ingrese denuevo la nueva contraseña";
      } else if (data.confirmPassword !== data.password) {
        errors.confirmPassword = "No es identica la contraseña";
      }

      return errors;
    },
    onSubmit: (data) => {
      setDatas([...datas, data]);
      setShowMessage(true);

      formik.resetForm();
    },
  });
  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  return (
    <div className="centro col-3">
      <div className="card p-card ">
        <h3 className="text-center">Register</h3>
        <form onSubmit={formik.handleSubmit} className="p-fluid">
          <div className="field">
            <label htmlFor={"password"}>Ingrese una nueva contraseña</label>
            <span className="p-float-label">
              <Password
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                toggleMask
                promptLabel="Ingrese una contraseña segura"
                weakLabel="Seguridad Baja"
                mediumLabel="Seguridad Media"
                strongLabel="Seguridad Alta"
                placeholder="Contraseña"
                className={classNames({
                  "p-invalid": isFormFieldValid("password"),
                })}
              />
            </span>
            {getFormErrorMessage("password")}
          </div>
          <div className="field">
            <label htmlFor={"confirmPassword"}>Confirmar contraseña</label>
            <span className="p-float-label">
              <Password
                id="confirmPassword"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                toggleMask
                feedback={false}
                placeholder="Confirmar contraseña"
                className={classNames({
                  "p-invalid": isFormFieldValid("confirmPassword"),
                })}
              />
            </span>
            {getFormErrorMessage("confirmPassword")}
          </div>

          <Button type="submit" label="Submit" className="mt-2" />
        </form>
      </div>
    </div>
  );
}

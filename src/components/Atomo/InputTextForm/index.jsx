import React from "react";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import "./styles.scss";
export default function InputTextForm({
  nameLabel,
  nameInput,
  dataInput,
  submitted,
  onInputChange,
  getFormErrorMessage,
  required,
  disabled,
  mayus
}) {
  let name =
    nameLabel.charAt(0).toUpperCase() + nameLabel.slice(1).toLowerCase();

  return (
    <>
      <div className="field">
        <label htmlFor={nameLabel.toLowerCase()} >
          {mayus?name.toUpperCase():name} {required === true && <span className="requiere">*</span>}
        </label>
        {required ? (
          <>
            <InputText
              id={nameInput}
              value={dataInput}
              onChange={(e) => onInputChange(e, nameInput)}
              // required
              autoFocus
              disabled={disabled}
              className={` ${classNames({
                "p-invalid": submitted && !dataInput,
              })}`}
            />
            {getFormErrorMessage(nameInput)}
          </>
        ) : (
          <InputText
            id={nameInput}
            value={dataInput}
            onChange={(e) => onInputChange(e, nameInput)}
            autoFocus
            disabled={disabled}
          />
        )}
      </div>
    </>
  );
}

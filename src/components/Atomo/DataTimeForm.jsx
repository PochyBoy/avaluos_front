import classNames from "classnames";
import { Calendar } from "primereact/calendar";
import React from "react";

export default function DataTimeForm({
  nameLabel,
  submitted,
  nameInput,
  dataInput,
  onInputChange,
  required,
  getFormErrorMessage,
  disabled
}) {

  let name =
    nameLabel.charAt(0).toUpperCase() + nameLabel.slice(1).toLowerCase();
  return (
    <>
      <div className="field">
        <label htmlFor={nameLabel.toLowerCase()}>
          {name} {required === true && <span className="requiere">*</span>}
        </label>
        {required ? (
          <>
            <Calendar
              dateFormat="dd/mm/yy"
              id={nameInput}
              name={nameInput}
              value={dataInput}
              onChange={(e) => onInputChange(e, nameInput, true)}
              showIcon
              autoFocus
              disabled={disabled}
              className={` ${classNames({
                "p-invalid": submitted && !dataInput,
              })}`}
            />
            {getFormErrorMessage(nameInput)}
          </>
        ) : (
          <>
            <Calendar
              dateFormat="dd/mm/yy"
              id={nameInput}
              name={nameInput}
              value={dataInput}
              onChange={(e) => onInputChange(e, nameInput, true)}
              showIcon
              autoFocus
              disabled={disabled}
            />
            {getFormErrorMessage(nameInput)}
          </>
        )}
      </div>
    </>
  );
}

import classNames from "classnames";
import { Calendar } from "primereact/calendar";
import React from "react";

export default function DateTimeHoraForm({
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
              id={nameInput}
              name={nameInput}
              value={dataInput}
              onChange={(e) => onInputChange(e, nameInput, true)}
              timeOnly
              showIcon
              autoFocus
              hourFormat="24"
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
              id={nameInput}
              name={nameInput}
              value={dataInput}
              onChange={(e) => onInputChange(e, nameInput, true)}
              timeOnly
              showIcon
              autoFocus
              disabled={disabled}
              hourFormat="24"
            />
          </>
        )}
      </div>
    </>
  );
}

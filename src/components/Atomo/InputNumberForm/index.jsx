import React from "react";
import { InputNumber } from "primereact/inputnumber";
import classNames from "classnames";

export default function InputNumberForm({
  nameLabel,
  submitted,
  nameInput,
  dataInput,
  onInputChange,
  getFormErrorMessage,
  required,
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
            <InputNumber
              id={nameInput}
              name={nameInput}
              value={dataInput}
              onValueChange={(e) => onInputChange(e, nameInput)}
              autoFocus
              mode="decimal"
              className={classNames({
                "p-invalid": submitted && !dataInput,
              })}
            />
            {getFormErrorMessage(nameInput)}
          </>
        ) : (
          <InputNumber
            id={nameInput}
            value={dataInput}
            onValueChange={(e) => onInputChange(e, nameInput)}
            autoFocus
          />
        )}
      </div>
    </>
  );
}

import React from "react";
import { Dropdown } from "primereact/dropdown";
import classNames from "classnames";
export default function SelectFromText({
  nameLabel,
  submitted,
  nameInput,
  dataInput,
  onInputChange,
  optionLabel,
  options,
  placeholder,
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
            <Dropdown
              id={nameInput}
              name={nameInput}
              value={dataInput}
              options={options} //arreglo de objeto
              onChange={(e) => onInputChange(e, nameInput)}
              optionLabel={optionLabel} // columna del objeto "name"
              autoFocus
              disabled={disabled}
              placeholder={placeholder}
              className={` ${classNames({
                "p-invalid": submitted && !dataInput,
              })}`}
            />
            {getFormErrorMessage(nameInput)}
          </>
        ) : (
          <>
            <Dropdown
              id={nameInput}
              name={nameInput}
              value={dataInput}
              options={options} //arreglo de objeto
              onChange={(e) => onInputChange(e, nameInput)}
              optionLabel={optionLabel} // columna del objeto "name"
              autoFocus
              disabled={disabled}
              placeholder={placeholder}
            />
          </>
        )}
      </div>
    </>
  );
}

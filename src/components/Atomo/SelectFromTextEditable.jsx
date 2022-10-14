import React from "react";
import { Dropdown } from "primereact/dropdown";
import classNames from "classnames";
export default function SelectFromTextEditable({
  nameLabel,
  submitted,
  nameInput,
  dataInput,
  onInputChange,
  optionLabel,
  options,
}) {
  let name =
    nameLabel.charAt(0).toUpperCase() + nameLabel.slice(1).toLowerCase();

  return (
    <>
      <div className="field">
        <label htmlFor={nameLabel.toLowerCase()}>{name}</label>
        <Dropdown
          id={nameInput}
          value={dataInput}
          options={options} //arreglo de objeto
          onChange={(e) => onInputChange(e, nameInput)}
          optionLabel={optionLabel} // columna del objeto "name"
          editable
          required
          autoFocus
          className={` ${classNames({
            "p-invalid": submitted && !dataInput,
          })}`}
        />
        {submitted && !dataInput && (
          <small className="p-invalid">{`${name} es Requerido.`} </small>
        )}
      </div>
    </>
  );
}

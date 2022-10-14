import classNames from "classnames";
import { MultiSelect } from "primereact/multiselect";
import React from "react";
import "./styles.scss"
export default function MultiSelectFrom({
  nameLabel,
  nameInput,
  submitted,
  valueFrom,
  setValueFrom,
  optionsFrom,
  optionLabelFrom,
  placeholderFrom,
  required,
  getFormErrorMessage
}) {
  let name =
    nameLabel.charAt(0).toUpperCase() + nameLabel.slice(1).toLowerCase();

  return (
    <>
      <div className="field">
        <label htmlFor={nameLabel.toLowerCase()}>{name} {required === true && <span className="requiere">*</span>}</label>
        {required ? (
          <>
            <MultiSelect
              id={nameInput}
              name={nameInput}
              value={valueFrom}
              options={optionsFrom}
              onChange={(e) => setValueFrom(e, nameInput, false)}
              optionLabel={optionLabelFrom}
              placeholder={placeholderFrom}
              display="chip"
              autoFocus
              className={classNames({
                "p-invalid": submitted && !valueFrom,
              })}
            />
            {getFormErrorMessage(nameInput)}
          </>
        ) : (
          <>
            <MultiSelect
              id={nameInput}
              value={valueFrom}
              options={optionsFrom}
              onChange={(e) => setValueFrom(e, nameInput, false)}
              optionLabel={optionLabelFrom}
              placeholder={placeholderFrom}
              display="chip"
              autoFocus
            />

          </>
        )}
      </div>
    </>
  );
}

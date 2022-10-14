import React from "react";
import { InputTextarea } from "primereact/inputtextarea";
import classNames from "classnames";
import "./styles.scss"
export default function InputTextTareaForm({
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
            <InputTextarea
              id={nameInput}
              rows={5}
              cols={30}
              value={dataInput}
              onChange={(e) => onInputChange(e, nameInput)}
              autoResize
              // required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !dataInput,
              })}
            />
            {getFormErrorMessage(nameInput)}
          </>
        ) : (
          <InputTextarea
            id={nameInput}
            rows={5}
            cols={30}
            value={dataInput}
            onChange={(e) => onInputChange(e, nameInput)}
            autoResize
            autoFocus
            // className={classNames({
            //   "p-invalid": submitted && !dataInput,
            // })}
          />
        )}

        {/* {submitted && !dataInput && (
          <small className="p-invalid">{`${name} es Requerido.`} </small>
        )} */}
      </div>
    </>
  );
}

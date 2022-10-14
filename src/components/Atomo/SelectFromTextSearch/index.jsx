import React from "react";
import { Dropdown } from "primereact/dropdown";
import classNames from "classnames";
import "./styles.scss";
export default function SelectFromTextSearch({
  nameLabel,
  submitted,
  nameInput,
  dataInput,
  onInputChange,
  optionLabel,
  options,
  placeholder,
  getFormErrorMessage,
  required,
  disabled,
}) {
  let name =
    nameLabel.charAt(0).toUpperCase() + nameLabel.slice(1).toLowerCase();
  const selectedCountryTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option[optionLabel]}</div>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const countryOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option[optionLabel]}</div>
      </div>
    );
  };

  return (
    <>
      <div className="field">
        <label htmlFor={nameLabel.toLowerCase()}>
          {name} {required === true && <span className="requiere">*</span>}
        </label>
        {required ? (
          <>
            {" "}
            <Dropdown
              id={nameInput}
              name={nameInput}
              value={dataInput} //El dato a mostrar del UseState
              options={options}
              onChange={(e) => onInputChange(e, nameInput)} //Desde la pagina se le envia el Set del UseState
              optionLabel={optionLabel}
              autoFocus
              filter
              showClear
              disabled={disabled}
              filterBy={optionLabel} // columna del objeto "name"
              placeholder={placeholder}
              valueTemplate={selectedCountryTemplate}
              itemTemplate={countryOptionTemplate}
              className={` ${classNames({
                "p-invalid": submitted && !dataInput,
              })}`}
            />
            {getFormErrorMessage(nameInput)}
          </>
        ) : (
          <>
            {" "}
            <Dropdown
              id={nameInput}
              name={nameInput}
              value={dataInput} //El dato a mostrar del UseState
              options={options}
              onChange={(e) => onInputChange(e, nameInput)} //Desde la pagina se le envia el Set del UseState
              optionLabel={optionLabel}
              autoFocus
              filter
              disabled={disabled}
              showClear
              filterBy={optionLabel} // columna del objeto "name"
              placeholder={placeholder}
              valueTemplate={selectedCountryTemplate}
              itemTemplate={countryOptionTemplate}
            />
          </>
        )}
      </div>
    </>
  );
}

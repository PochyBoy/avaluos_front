import { Dialog } from "primereact/dialog";
import { InputSwitch } from "primereact/inputswitch";
import React from "react";
import InputTextForm from "../Atomo/InputTextForm";
import DialogFormFooter from "../Molecula/DialogFormFooter";
import InputNumberForm from "../Atomo/InputNumberForm";
export default function ModalAsignacionSLA({
  productDialog,
  hideDialog,
  saveProduct,
  submitted,
  data,
  onInputChange,
  getFormErrorMessage,

  required,
}) {
  return (
    <>
      <Dialog
        visible={productDialog}
        style={{ width: "450px" }}
        header="Detalle del registro"
        modal
        className="p-fluid"
        footer={DialogFormFooter({
          OnClickTimes: hideDialog,
          OnClickCheck: saveProduct,
        })}
        onHide={hideDialog}
      >
        {/* Codigo */}
        <InputTextForm
          submitted={submitted}
          nameLabel={"codigo"}
          nameInput={"codigo"}
          dataInput={data.codigo}
          onInputChange={onInputChange}
          getFormErrorMessage={getFormErrorMessage}
          required={required && required.codigo}
        />
        {/* Actividad */}
        <InputTextForm
          submitted={submitted}
          nameLabel={"actividad"}
          nameInput={"actividad"}
          dataInput={data.actividad}
          onInputChange={onInputChange}
          getFormErrorMessage={getFormErrorMessage}
          required={required && required.actividad}
        />
        {/* Regla */}
        <InputTextForm
          submitted={submitted}
          nameLabel={"regla"}
          nameInput={"regla"}
          dataInput={data.regla}
          onInputChange={onInputChange}
          getFormErrorMessage={getFormErrorMessage}
          required={required && required.regla}
        />
        {/* Tiempo */}
        <InputNumberForm
          submitted={submitted}
          nameLabel={"tiempo"}
          nameInput={"tiempo"}
          dataInput={data.tiempo}
          onInputChange={onInputChange}
          getFormErrorMessage={getFormErrorMessage}
          required={required && required.tiempo}
        />

        {/* Observacion */}
        <InputTextForm
          submitted={submitted}
          nameLabel={"observacion"}
          nameInput={"observacion"}
          dataInput={data.observacion}
          onInputChange={onInputChange}
          getFormErrorMessage={getFormErrorMessage}
          required={required && required.observacion}
        />
        <div className="field">
          <label htmlFor={"Estado".toLowerCase()}>Estado</label>
          <br />
          <InputSwitch
            id="estado"
            name="estado"
            checked={data.estado}
            onChange={(e) => onInputChange(e, "estado")}
          />
        </div>
      </Dialog>
    </>
  );
}

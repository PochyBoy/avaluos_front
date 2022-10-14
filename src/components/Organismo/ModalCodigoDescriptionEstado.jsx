import { Dialog } from "primereact/dialog";
import { InputSwitch } from "primereact/inputswitch";
import React from "react";
import InputTextForm from "../Atomo/InputTextForm";
import InputTextTareaForm from "../Atomo/InputTextTareaForm";
import DialogFormFooter from "../Molecula/DialogFormFooter";

export default function ModalCodigoDescriptionEstado({
  productDialog,
  hideDialog,
  saveProduct,
  submitted,
  data,
  onInputChange,
  getFormErrorMessage,
  required1,
  required2,
}) {
  return (
    <div>
      {/* Modal formulario de creacion y editar */}
      <Dialog
        visible={productDialog}
        style={{ width: "450px" }}
        header="Detalle del registro"
        modal
        className="p-fluid"
        footer={DialogFormFooter({
          OnClickTimes: hideDialog,
          OnClickCheck: saveProduct, //DialogFormFooter
        })}
        onHide={hideDialog}
      >
        {/* Codigo */}
        <InputTextForm
          submitted={submitted}
          nameLabel={`Codigo`}
          nameInput={"codigo"}
          dataInput={data.codigo}
          // onInputChange={onInputChange}
          getFormErrorMessage={getFormErrorMessage}
          required={required1}
          disabled={true}
        />
        {/* Description */}
        <InputTextTareaForm
          submitted={submitted}
          nameLabel={"Descricción"}
          nameInput={"descripcion"}
          dataInput={data.descripcion}
          onInputChange={onInputChange}
          getFormErrorMessage={getFormErrorMessage}
          required={required2}
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
    </div>
  );
}

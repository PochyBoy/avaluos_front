import { Dialog } from "primereact/dialog";
import { InputSwitch } from "primereact/inputswitch";
import React from "react";
import InputTextForm from "../../Atomo/InputTextForm";
import DialogFormFooter from "../../Molecula/DialogFormFooter";
import SelectFromTextSearch from "../../Atomo/SelectFromTextSearch";
export default function ModalCodigoNombreEmailRolEstado({
  productDialog,
  hideDialog,
  saveProduct,
  submitted,
  data,
  onInputChange,
  getFormErrorMessage,
  rol,
}) {
  return (
    <div>
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
          nameLabel={"Codigo"}
          nameInput={"codigo"}
          dataInput={data.codigo}
          // onInputChange={onInputChange}
          getFormErrorMessage={getFormErrorMessage}
          required={true}
          disabled={true}
        />

        {/* Nombre */}
        <InputTextForm
          submitted={submitted}
          nameLabel={"nombre"}
          nameInput={"nombre"}
          dataInput={data.nombre}
          onInputChange={onInputChange}
          getFormErrorMessage={getFormErrorMessage}
          required={true}
        />

        {/* Usuario */}
        <InputTextForm
          submitted={submitted}
          nameLabel={"email"}
          nameInput={"email"}
          dataInput={data.email}
          onInputChange={onInputChange}
          getFormErrorMessage={getFormErrorMessage}
          required={true}
        />

        {/* Rol */}
        <SelectFromTextSearch
          submitted={submitted}
          nameLabel={"Rol"}
          nameInput={"rol"}
          dataInput={data.rol}
          onInputChange={onInputChange}
          optionLabel={"name"}
          options={rol}
          placeholder={"Seleccione Rol"}
          getFormErrorMessage={getFormErrorMessage}
          required={true}
        />

        {/* Estado */}

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

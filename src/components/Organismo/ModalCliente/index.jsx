import { Dialog } from "primereact/dialog";
import React from "react";
import DataTimeForm from "../../Atomo/DataTimeForm";
import InputTextForm from "../../Atomo/InputTextForm";
import DialogFormFooter from "../../Molecula/DialogFormFooter";
import SelectFromText from "../../Atomo/SelectFromText";
import { InputSwitch } from "primereact/inputswitch";
import "./styles.scss";
export default function ModalCliente({
  productDialog,
  hideDialog,
  saveProduct,
  submitted,
  data,
  onInputChange,
  getFormErrorMessage,
  getCalificacion,
  dataLogin,
}) {
  // ];
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
        {/* fecha_visita */}

        <DataTimeForm
          submitted={submitted}
          nameLabel={"Fecha en la que el perito avaluador, visitó del bien."}
          nameInput={"fecha_visita"}
          dataInput={data.fecha_visita}
          onInputChange={onInputChange}
          getFormErrorMessage={getFormErrorMessage}
          required={true}
        />
        {/* fecha_pago */}

        <DataTimeForm
          submitted={submitted}
          nameLabel={"Fecha en la que realizó el pago al perito avaluador."}
          nameInput={"fecha_pago"}
          dataInput={data.fecha_pago}
          onInputChange={onInputChange}
          getFormErrorMessage={getFormErrorMessage}
          required={true}
        />

        {/* calificacion */}

        <SelectFromText
          nameLabel={
            "Calificar el servicio del perito avaluador(1 más bajo y 5 más alto)"
          }
          nameInput={"calificacion"}
          dataInput={data.calificacion}
          onInputChange={onInputChange}
          optionLabel={"name"}
          options={getCalificacion}
          placeholder={"Seleccione Calificacion"}
          getFormErrorMessage={getFormErrorMessage}
        />
        {/* email */}
        {dataLogin.rol === "Administrador" ? (
          <InputTextForm
            submitted={submitted}
            nameLabel={`email`}
            nameInput={"email"}
            dataInput={data.email}
            onInputChange={onInputChange}
            getFormErrorMessage={getFormErrorMessage}
            required={true}
          />
        ) : null}

        {/* comentario */}
        <InputTextForm
          submitted={submitted}
          nameLabel={`Comentarios adicionales`}
          nameInput={"comentario"}
          dataInput={data.comentario}
          onInputChange={onInputChange}
          getFormErrorMessage={getFormErrorMessage}
        />
        {/* conformidad */}
        {dataLogin.rol === "Administrador" ? (
          <div className="field">
            <label htmlFor={"Estado".toLowerCase()}>Conformidad</label>
            <br />
            <InputSwitch
              id="conformidad"
              name="conformidad"
              checked={data.conformidad}
              onChange={(e) => onInputChange(e, "conformidad")}
            />
          </div>
        ) : null}
      </Dialog>
    </div>
  );
}

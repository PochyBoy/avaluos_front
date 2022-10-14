import { Dialog } from "primereact/dialog";
import React from "react";
import DataTimeForm from "../../Atomo/DataTimeForm";
import InputTextForm from "../../Atomo/InputTextForm";
import SelectFromTextSearch from "../../Atomo/SelectFromTextSearch";
import DialogFormFooter from "../../Molecula/DialogFormFooter";
import { Button } from "primereact/button";
import "./styles.scss";
export default function Anexo2({
  productDialog,
  hideDialog,
  saveProduct,
  submitted,
  data,
  onInputChange,
  getFormErrorMessage,
  getMunicipo,
  getAvaluador,
  cities,
  openNewMunicipio,
}) {
  return (
    <>
      {/* Modal formulario de creacion y editar */}
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
        <div className="flex">
          {/* Municipio */}
          <div className="espaciadoConvenio">
            <SelectFromTextSearch
              submitted={submitted}
              nameLabel={"Municipio"}
              nameInput={"municipio"}
              dataInput={data.municipio}
              onInputChange={onInputChange}
              options={getMunicipo}
              optionLabel={"descripcion"}
              placeholder={"Seleccione Municipior"}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
            />
          </div>
          <div>
            <Button
              icon="pi pi-plus"
              className="btnConvenio"
              onClick={openNewMunicipio}
            />
          </div>
        </div>

        {/* Perito */}
        <SelectFromTextSearch
          submitted={submitted}
          nameLabel={"Perito Avaluador"}
          nameInput={"perito"}
          dataInput={data.perito}
          onInputChange={onInputChange}
          optionLabel={"nombre"}
          options={getAvaluador}
          placeholder={"Seleccione Perito Avaluador"}
          getFormErrorMessage={getFormErrorMessage}
          required={true}
        />

        {/* Nombre Proyecto */}
        <InputTextForm
          submitted={submitted}
          nameLabel={"Nombre del proyecto"}
          nameInput={"nombre_proyecto"}
          dataInput={data.nombre_proyecto}
          onInputChange={onInputChange}
          getFormErrorMessage={getFormErrorMessage}
          required={true}
        />
        <div className="DisplayFlexSpaceBetween">
          <div className="widthInput">
            {/* Fecha Inicio */}
            <DataTimeForm
              submitted={submitted}
              nameLabel={"Fecha inicio"}
              nameInput={"fecha_inicio"}
              dataInput={data.fecha_inicio}
              onInputChange={onInputChange}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
            />
          </div>
          <div className="widthInput">
            {/* Fecha Final */}
            <DataTimeForm
              submitted={submitted}
              nameLabel={"Fecha fin"}
              nameInput={"fecha_fin"}
              dataInput={data.fecha_fin}
              onInputChange={onInputChange}
              getFormErrorMessage={getFormErrorMessage}
              required={false}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
}

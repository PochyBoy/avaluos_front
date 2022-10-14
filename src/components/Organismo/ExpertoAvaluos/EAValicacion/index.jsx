import { Dialog } from "primereact/dialog";
import React from "react";

import DateTimeHoraForm from "../../../Atomo/DateTimeHoraForm";
import InputTextForm from "../../../Atomo/InputTextForm";
import SelectFromTextSearch from "../../../Atomo/SelectFromTextSearch";
import SelectFromText from "../../../Atomo/SelectFromText";
import { Button } from "primereact/button";
import DataTimeForm from "../../../Atomo/DataTimeForm";
export default function EAValicacion({
  productDialog,
  hideDialog,
  data,
  onInputChange,
  getFormErrorMessage,
  getMunicipo,
  countries,
  GetRequerimiento,
  GetAsignacion,
  GetPeritos,
  GetConvenio,
  GetBanca,
  GetBien,
  BotonesSolicitantes,
}) {
  const btnCerrar = () => {
    return (
      <Button label="Cerrar" className="p-button-text" onClick={hideDialog} />
    );
  };
  return (
    <>
      <Dialog
        visible={productDialog}
        header="Detalle del registro"
        modal
        className="p-fluid screenWidth"
        footer={btnCerrar}
        onHide={hideDialog}
      >
        <div className="DialogModalSM">
          <div className="screemWidthColum">
            {/* numero_solicitud */}
            <InputTextForm
              nameLabel={"No. solicitud"}
              nameInput={"numero_solicitud"}
              dataInput={data.numero_solicitud}
              // onInputChange={onInputChange}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
              disabled={true}
            />
            {/* solicitante */}
            <InputTextForm
              nameLabel={"Solicitante"}
              nameInput={"solicitante"}
              dataInput={data.solicitante}
              // onInputChange={onInputChange}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
              disabled={true}
            />
            <div className="DisplayFlexSpaceBetween">
              <div className="widthInput">
                {/* fecha_solicitud */}
                <DataTimeForm
                  nameLabel={"Fecha de solicitud "}
                  nameInput={"fecha_solicitud"}
                  dataInput={data.fecha_solicitud}
                  // onInputChange={onInputChange}
                  getFormErrorMessage={getFormErrorMessage}
                  required={true}
                  disabled={true}
                />
              </div>
              <div className="widthInput">
                {/* hora_solicitud */}
                <DateTimeHoraForm
                  nameLabel={"Hora Solicitud"}
                  nameInput={"hora_solicitud"}
                  dataInput={data.hora_solicitud}
                  // onInputChange={onInputChange}
                  getFormErrorMessage={getFormErrorMessage}
                  required={true}
                  disabled={true}
                />
              </div>
            </div>
            {/* tipo_banca */}

            <SelectFromTextSearch
              nameLabel={"Tipo de banca"}
              nameInput={"tipo_banca"}
              dataInput={data.tipo_banca}
              onInputChange={onInputChange}
              optionLabel={"descripcion"}
              options={GetBanca}
              placeholder={"Seleccione Tipo de Banca"}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
              disabled={true}
            />

            {/* tipo_bien */}
            <SelectFromTextSearch
              nameLabel={"Tipo Bien"}
              nameInput={"tipo_bien"}
              dataInput={data.tipo_bien}
              onInputChange={onInputChange}
              optionLabel={"descripcion"}
              options={GetBien}
              placeholder={"Seleccione Tipo Bien"}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
              disabled={true}
            />

            {/* ////////////////////////////// */}
            {/* persona_referencia */}
            <InputTextForm
              nameLabel={"Persona Referencia"}
              nameInput={"persona_referencia"}
              dataInput={data.persona_referencia}
              onInputChange={onInputChange}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
              disabled={true}
            />
            {/* ////////////////////////////// */}
            {/* agencia */}
            <InputTextForm
              nameLabel={"Agencia"}
              nameInput={"agencia"}
              dataInput={data.agencia}
              onInputChange={onInputChange}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
              disabled={true}
            />
            {/* Municipio */}
            <SelectFromTextSearch
              nameLabel={"Municipio del bien"}
              nameInput={"municipio"}
              dataInput={data.municipio}
              onInputChange={onInputChange}
              optionLabel={"descripcion"}
              options={getMunicipo}
              placeholder={"Seleccione Municipio"}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
              disabled={true}
            />
          </div>
          <div className="screemWidthColum">
            {/* cod_cliente */}
            <SelectFromTextSearch
              nameLabel={"Código del cliente"}
              nameInput={"cod_cliente"}
              dataInput={data.cod_cliente}
              onInputChange={onInputChange}
              optionLabel={"code"}
              options={countries}
              placeholder={"Seleccione Codigo de Cliente"}
              getFormErrorMessage={getFormErrorMessage}
              required={false}
              disabled={true}
            />
            {/* nombre_cliente */}
            <SelectFromTextSearch
              nameLabel={"Nombre / Razón Social"}
              nameInput={"nombre_cliente"}
              dataInput={data.nombre_cliente}
              onInputChange={onInputChange}
              optionLabel={"name"}
              options={countries}
              placeholder={"Seleccione Nombre de Cliente"}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
              disabled={true}
            />
            {/* telefono_celular */}
            <InputTextForm
              nameLabel={"Telefono celular"}
              nameInput={"telefono_celular"}
              dataInput={data.telefono_celular}
              onInputChange={onInputChange}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
              disabled={true}
            />
            {/* correo_electronico */}
            <InputTextForm
              nameLabel={"Correo electrónico"}
              nameInput={"correo_electronico"}
              dataInput={data.correo_electronico}
              onInputChange={onInputChange}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
              disabled={true}
            />
            {/* tipo_requerimiento */}

            <SelectFromText
              nameLabel={"Tipo de requerimiento"}
              nameInput={"tipo_requerimiento"}
              dataInput={data.tipo_requerimiento}
              onInputChange={onInputChange}
              options={GetRequerimiento}
              optionLabel={"name"}
              placeholder={"Seleccione Requerimiento"}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
              disabled={true}
            />
            {/* convenio */}
            <SelectFromText
              nameLabel={"Convenio"}
              nameInput={"convenio"}
              dataInput={data.convenio}
              onInputChange={onInputChange}
              optionLabel={"nombre_proyecto"}
              options={GetConvenio}
              placeholder={"Seleccione Convenio"}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
            />

            {/* tipo_asignacion */}
            <SelectFromText
              nameLabel={"Tipo de asignación"}
              nameInput={"tipo_asignacion"}
              dataInput={data.tipo_asignacion}
              onInputChange={onInputChange}
              optionLabel={"name"}
              options={GetAsignacion}
              placeholder={"Seleccione Tipo Asignacion"}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
              disabled={true}
            />
            {/* perito_asignado */}
            <SelectFromTextSearch
              nameLabel={"Perito que realizó el primer avalúo"}
              nameInput={"perito_asignado"}
              dataInput={data.perito_asignado}
              onInputChange={onInputChange}
              optionLabel={"name"}
              options={GetPeritos}
              placeholder={"Seleccione Perito Asignado"}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
              disabled={true}
            />
          </div>
        </div>
        <BotonesSolicitantes />
      </Dialog>
    </>
  );
}

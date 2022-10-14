import { Dialog } from "primereact/dialog";
import React from "react";
import DataTimeForm from "../../Atomo/DataTimeForm";
import InputTextForm from "../../Atomo/InputTextForm";
import { Button } from "primereact/button";
import SelectFromText from "../../Atomo/SelectFromText";
import DialogFormFooter from "../../Molecula/DialogFormFooter";
import InputNumberForm from "../../Atomo/InputNumberForm";
import SelectFromTextSearch from "../../Atomo/SelectFromTextSearch";
import "./styles.scss";
export default function Anexo1({
  productDialog,
  hideDialog,
  saveProduct,
  submitted,
  data,
  onInputChange,
  getFormErrorMessage,
  GetMunicipo,
  GetProfesion,
  GetEspecialidad,
  GetContrato,
  GetServiciosGeneral,
  requiredSG,
  openNewMunicipio,
}) {
  return (
    <>
      <Dialog
        visible={productDialog}
        header="Detalle del registro"
        modal
        className="p-fluid screenWidth"
        footer={DialogFormFooter({
          OnClickTimes: hideDialog,
          OnClickCheck: saveProduct,
        })}
        onHide={hideDialog}
      >
        <div className="DialogModalSM">
          <div className="screemWidthColum">
            {/* Especialidad */}
            <SelectFromText
              nameLabel={"Tipo de Persona"}
              submitted={submitted}
              nameInput={"tipo_de_persona"}
              dataInput={data.tipo_de_persona}
              onInputChange={onInputChange}
              optionLabel={"name"}
              options={GetServiciosGeneral}
              placeholder={"Seleccione el Servicio General"}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
            />
            <div className="DisplayFlexSpaceBetween">
              <div className="widthInput">
                {/* Fecha Inicio */}
                <DataTimeForm
                  submitted={submitted}
                  nameLabel={"Fecha de Inicio"}
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
                  nameLabel={"Fecha Fin"}
                  nameInput={"fecha_fin"}
                  dataInput={data.fecha_fin}
                  onInputChange={onInputChange}
                  getFormErrorMessage={getFormErrorMessage}
                  required={false}
                />
              </div>
            </div>
            {/* Nombre */}
            <InputTextForm
              submitted={submitted}
              nameLabel={"Nombre y Apellido / Razón Social"}
              nameInput={"nombre"}
              dataInput={data.nombre}
              onInputChange={onInputChange}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
            />
            {/* Representante Legal */}
            <InputTextForm
              submitted={submitted}
              nameLabel={"Representantes Legales"}
              nameInput={"representante_legal"}
              dataInput={data.representante_legal}
              onInputChange={onInputChange}
              getFormErrorMessage={getFormErrorMessage}
              required={false}
            />
            {/* Domicilio Legal */}
            <InputTextForm
              submitted={submitted}
              nameLabel={"Domicilio Legal"}
              nameInput={"domicilio_legal"}
              dataInput={data.domicilio_legal}
              onInputChange={onInputChange}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
            />
            {/* Domicilio */}
            <InputTextForm
              submitted={submitted}
              nameLabel={"Domicilio"}
              nameInput={"domicilio"}
              dataInput={data.domicilio}
              onInputChange={onInputChange}
              getFormErrorMessage={getFormErrorMessage}
              required={false}
            />
            {/* Municipio */}
            <div className="flex">
              <div className="espaciadoAvaluadores">
                <SelectFromTextSearch
                  submitted={submitted}
                  nameLabel={"Municipio"}
                  nameInput={"municipio"}
                  dataInput={data.municipio}
                  onInputChange={onInputChange}
                  optionLabel={"descripcion"}
                  options={GetMunicipo}
                  placeholder={"Seleccione Municipio"}
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

            {/* Profesion */}

            <SelectFromTextSearch
              submitted={submitted}
              nameLabel={"Profesión"}
              nameInput={"profesion"}
              dataInput={data.profesion}
              onInputChange={onInputChange}
              optionLabel={"descripcion"}
              options={GetProfesion}
              placeholder={"Seleccione Profesion"}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
            />
          </div>

          <div className="screemWidthColum">
            {/* Especialidad */}
            <SelectFromText
              nameLabel={"Especialidad de Valuación"}
              submitted={submitted}
              nameInput={"especialidad_valuacion"}
              dataInput={data.especialidad_valuacion}
              onInputChange={onInputChange}
              optionLabel={"name"}
              options={GetEspecialidad}
              placeholder={"Seleccione Especialidad de Valuación"}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
            />
            {/* Tiempo Experiencia */}
            <InputNumberForm
              submitted={submitted}
              nameLabel={"Tiempo Experiencia en Avalúos (Años)"}
              nameInput={"tiempo_experiencia"}
              dataInput={data.tiempo_experiencia}
              onInputChange={onInputChange}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
            />
            {/* Contrato */}
            <SelectFromText
              nameLabel={"Contrato"}
              submitted={submitted}
              nameInput={"contrato"}
              dataInput={data.contrato}
              onInputChange={onInputChange}
              optionLabel={"name"}
              options={GetContrato}
              placeholder={"Seleccione Contrato"}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
            />
            {/* Email */}
            <InputTextForm
              submitted={submitted}
              nameLabel={"Correo Electrónico"}
              nameInput={"correo_electronico"}
              dataInput={data.correo_electronico}
              onInputChange={onInputChange}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
            />
            <div className="DisplayFlexSpaceBetween">
              <div className="widthInput">
                {/* Telefono Oficina */}
                <InputTextForm
                  submitted={submitted}
                  nameLabel={"Teléfono Oficina"}
                  nameInput={"telefono_oficina"}
                  dataInput={data.telefono_oficina}
                  onInputChange={onInputChange}
                  getFormErrorMessage={getFormErrorMessage}
                  required={true}
                />
              </div>
              <div className="widthInput">
                {/* Telefono Celular */}
                <InputTextForm
                  submitted={submitted}
                  nameLabel={"Teléfono Celular"}
                  nameInput={"telefono_celular"}
                  dataInput={data.telefono_celular}
                  onInputChange={onInputChange}
                  getFormErrorMessage={getFormErrorMessage}
                  required={true}
                />
              </div>
            </div>

            <div className="DisplayFlexSpaceBetween">
              <div className="widthInput">
                {/* Ci */}
                <InputTextForm
                  submitted={submitted}
                  nameLabel={"Ci"}
                  nameInput={"ci"}
                  dataInput={data.ci}
                  onInputChange={onInputChange}
                  getFormErrorMessage={getFormErrorMessage}
                  required={
                    data.tipo_de_persona.name === "Persona natural" ? true : false
                  }
                  mayus={true}
                />
              </div>
              <div className="widthInput">
                {/* Nit */}
                <InputTextForm
                  submitted={submitted}
                  nameLabel={"Nit"}
                  nameInput={"nit"}
                  dataInput={data.nit}
                  onInputChange={onInputChange}
                  getFormErrorMessage={getFormErrorMessage}
                  required={
                    data.tipo_de_persona.name === "Empresa" ? true : false
                  }
                  mayus={true}
                />
              </div>
            </div>

            {/* Capacidad Avaluos */}
            <InputNumberForm
              submitted={submitted}
              nameLabel={"Capacidad de Avaluos al Mes"}
              nameInput={"capacidad_avaluos"}
              dataInput={data.capacidad_avaluos}
              onInputChange={onInputChange}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
}

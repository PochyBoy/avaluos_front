import { Dialog } from "primereact/dialog";
import { InputSwitch } from "primereact/inputswitch";
import React from "react";
import DataTimeForm from "../Atomo/DataTimeForm";
import InputTextForm from "../Atomo/InputTextForm";
import MultiSelectFrom from "../Atomo/MultiSelectFrom";
import SelectFromTextSearch from "../Atomo/SelectFromTextSearch";
import DialogFormFooter from "../Molecula/DialogFormFooter";

export default function ModalRegistroDeSolicitantes({
  productDialog,
  hideDialog,
  saveProduct,
  submitted,
  data,
  onInputChange,
  getFormErrorMessage,
  GetMunicipo,
  GetProfesion
}) {
  return (
    <>
      <Dialog
        visible={productDialog}
        // style={{width: screenWidth.modal}}
        header="Detalle del registro"
        modal
        className={`p-fluid screenWidth`}
        footer={DialogFormFooter({
          OnClickTimes: hideDialog,
          OnClickCheck: saveProduct,
        })}
        onHide={hideDialog}
      >
        <div className="DialogModalSM">
          <div className="screemWidthColum">
            <div className="DisplayFlexSpaceBetween">
              <div className="widthInput">
                {/* Fecha Inicio */}
                <DataTimeForm
                  submitted={submitted}
                  nameLabel={"Fecha Inicio"}
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
                  required={true}
                />
              </div>
            </div>
            {/* Nombre */}
            <InputTextForm
              submitted={submitted}
              nameLabel={"Nombre"}
              nameInput={"nombre"}
              dataInput={data.nombre}
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
              required={true}
            />
            {/* Municipio */}
            <MultiSelectFrom
              submitted={submitted}
              nameLabel={"municipio"}
              nameInput={"municipio"}
              valueFrom={data.municipio}
              setValueFrom={onInputChange}
              optionsFrom={GetMunicipo}
              optionLabelFrom={"descripcion"}
              placeholderFrom={"Seleccione Municipio"}
              getFormErrorMessage={getFormErrorMessage}
              required={true}
            />
            {/* Profesion  SelectFromTextSearch*/}
            <SelectFromTextSearch
              nameLabel={"Profesion"}
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
            {/* Email */}
            <InputTextForm
              submitted={submitted}
              nameLabel={"Email"}
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
                  nameLabel={"Telefono Oficina"}
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
                  nameLabel={"Telefono Celular"}
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
                  required={true}
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
                  required={true}
                />
              </div>
            </div>

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
          </div>
        </div>
      </Dialog>
    </>
  );
}

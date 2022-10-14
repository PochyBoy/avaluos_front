import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// primereact
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

// Component
import HeaderTableDataInputText from "./../../../../components/Molecula/HeaderTableDataInputText";
import DataTableFormSolicitud from "./../../../../components/Molecula/DataTableFormSolicitud";
import EAValicacion from "../../../../components/Organismo/ExpertoAvaluos/EAValicacion";
// Servicios"
import service from "./../../../../service/Recursos";
import servicios from "./servicios";

// Styles
import "./styles.scss";
// Formik
import { useFormik } from "formik";
// Redux
import {
  fetchAllRegistroSolicitudSlice,
  putValidacionSolicitudSlice,
} from "./../../../../store/slices/RegistroSolicitud";

import {
  fetchAllRegistroMunicipioSlice,
  fetchDescripcionRegistroMunicipioSlice,
} from "./../../../../store/slices/RegistroMunicipio";
import {
  fetchAllRegistroConveniosSlice,
  fetchDescripcionRegistroConveniosSlice,
} from "./../../../../store/slices/RegistroConvenios";
import {
  fetchAllRegistroBienSlice,
  fetchDescripcionRegistroBienSlice,
} from "./../../../../store/slices/RegistroBien";
import {
  fetchAllRegistroBancaSlice,
  fetchDescripcionRegistroBancaSlice,
} from "./../../../../store/slices/RegistroBanca";

export default function RevisionYValidacionAvaluos() {
  const toast = useRef(null);
  const dt = useRef(null);
  //Redux useSelector
  const RegistroSolicitud = useSelector((state) => state.RegistroSolicitud);
  const RegistroMunicipio = useSelector((state) => state.RegistroMunicipio);
  const RegistroConvenios = useSelector((state) => state.RegistroConvenios);
  const RegistroBien = useSelector((state) => state.RegistroBien);
  const RegistroBanca = useSelector((state) => state.RegistroBanca);

  // Estados useState
  const [data, setData] = useState(servicios.empty);

  ///////////////////
  const [productDialog, setProductDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const dispatch = useDispatch();
  // UseEffect de todos los datos

  useEffect(() => {
    dispatch(fetchAllRegistroSolicitudSlice());
    dispatch(fetchAllRegistroMunicipioSlice());
    dispatch(fetchDescripcionRegistroMunicipioSlice());
    dispatch(fetchAllRegistroConveniosSlice());
    dispatch(fetchDescripcionRegistroConveniosSlice());
    dispatch(fetchAllRegistroBienSlice());
    dispatch(fetchDescripcionRegistroBienSlice());
    dispatch(fetchAllRegistroBancaSlice());
    dispatch(fetchDescripcionRegistroBancaSlice());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: data,
    validate: (data) => {},
    onSubmit: (data) => {},
    enableReinitialize: true,
  });
  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  // Editar los datos del Anexo 3
  const editProduct = (dataObj) => {
    setData({
      ...dataObj,
      municipio: { descripcion: dataObj.municipio },
      cod_cliente: service.updateSelectSearch(dataObj.cod_cliente),
      nombre_cliente: service.updateSelectSearch(dataObj.nombre_cliente),
      tipo_banca: { descripcion: dataObj.tipo_banca },
      tipo_bien: { descripcion: dataObj.tipo_bien },
      tipo_requerimiento: { name: dataObj.tipo_requerimiento },
      tipo_asignacion: { name: dataObj.tipo_asignacion },
      convenio: { nombre_proyecto: dataObj.convenio }, 
      perito_asignado: { name: dataObj.perito_asignado },
      fecha_solicitud: service.fecha(dataObj.fecha_solicitud, true),
      hora_solicitud: service.fecha(dataObj.hora_solicitud, true),
    });
    formik.initialValues = dataObj;
    setProductDialog(true);
  };

  // Cerrar el formulario 3 de creacion
  const hideDialog = () => {
    formik.resetForm();
    setData(servicios.empty);
    setProductDialog(false);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-file"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editProduct(rowData)}
        />
      </div>
    );
  };
  const btnAceptar = () => {
    dispatch(
      putValidacionSolicitudSlice({
        id_solicitud: formik.values.id_solicitud,
        validacion: "Aceptar",
      })
    );
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Updated",
      life: 3000,
    });
  };
  const btnRechazar = () => {
    dispatch(
      putValidacionSolicitudSlice({
        id_solicitud: formik.values.id_solicitud,
        validacion: "Rechazar",
      })
    );
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Updated",
      life: 3000,
    });
  };
  const btnDevolver = () => {
    dispatch(
      putValidacionSolicitudSlice({
        id_solicitud: formik.values.id_solicitud,
        validacion: "Devolver",
      })
    );
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Updated",
      life: 3000,
    });
  };
  // ----------------------------
  const botonesSolicitantes = () => {
    return (
      <div className="containerBtn">
        <Button
          label="Aceptar"
          className="p-button-rounded  mr-2"
          onClick={btnAceptar}
        />
        <Button
          label="Rechazar"
          className="p-button-rounded  mr-2"
          onClick={btnRechazar}
        />
        <Button
          label="Devolver"
          className="p-button-rounded  mr-2"
          onClick={btnDevolver}
        />
      </div>
    );
  };
  ///

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          {/* Alerta de notificacion */}
          <Toast ref={toast} />
          {/* Fin */}

          {/* Tabla de todos los datos de banca */}
          <DataTableFormSolicitud
            dt={dt}
            products={RegistroSolicitud.allRegistroSolicitud}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            globalFilter={globalFilter}
            header={HeaderTableDataInputText({
              setGlobalFilter: setGlobalFilter,
              TitleName: "Revision y Validacion de Avalúos",
            })}
            editProductSuccess={editProduct}
            actionBodyTemplate={actionBodyTemplate}
            ColumnNameDataTable={servicios.ColumnNameDataTable}
          />
          {/* Fin */}
          {/* Modal formulario de creacion y editar */}

          <EAValicacion
            productDialog={productDialog}
            hideDialog={hideDialog}
            // saveProduct={formik.handleSubmit}
            data={formik.values}
            // onInputChange={formik.handleChange}
            getFormErrorMessage={getFormErrorMessage}
            getMunicipo={RegistroMunicipio.allDescripcionMunicipio}
            countries={servicios.countries}
            GetBanca={RegistroBanca.allDescripcionBanca}
            GetBien={RegistroBien.allDescripcionBien}
            GetRequerimiento={servicios.GetRequerimiento}
            GetAsignacion={servicios.GetAsignacion}
            GetPeritos={servicios.GetPeritos}
            GetConvenio={RegistroConvenios.allDescripcionConvenios}
            BotonesSolicitantes={botonesSolicitantes}
          />

          {/* Fin */}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
// primereact
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
// Component
import LeftToolBarTemplate from "../../../../components/Molecula/LeftToolBarTemplate";
import HeaderTableDataInputText from "../../../../components/Molecula/HeaderTableDataInputText";
import DialogConfirmDeleteName from "../../../../components/Organismo/DialogConfirmDeleteName";
import Anexo3 from "../../../../components/Organismo/Anexo3/Anexo3";
import DataTableFormSolicitudSolicitante from "../../../../components/Molecula/Solicitante/DataTableFormSolicitudSolicitante";
// Servicios"
import service from "../../../../service/Recursos";
import servicios from "./servicios";
// Styles
import "./styles.scss";
// Formik
import { useFormik } from "formik";
// Redux
import {
  deleteRegistroSolicitudSlice,
  fetchAllRegistroSolicitudSlice,
  postRegistroSolicitudSlice,
  putRegistroSolicitudSlice,
} from "../../../../store/slices/RegistroSolicitud";
import {
  fetchAllRegistroMunicipioSlice,
  fetchDescripcionRegistroMunicipioSlice,
} from "../../../../store/slices/RegistroMunicipio";
import {
  fetchAllRegistroConveniosSlice,
  fetchDescripcionRegistroConveniosSlice,
} from "../../../../store/slices/RegistroConvenios";
import {
  fetchAllRegistroBienSlice,
  fetchDescripcionRegistroBienSlice,
} from "../../../../store/slices/RegistroBien";
import {
  fetchAllRegistroBancaSlice,
  fetchDescripcionRegistroBancaSlice,
} from "../../../../store/slices/RegistroBanca";

export default function SolicitarAvaluos() {
  const dataLogin = JSON.parse(localStorage.getItem("isLogger"));

  const toast = useRef(null);
  const dt = useRef(null);

  //Redux useSelector
  const RegistroSolicitud = useSelector((state) => state.RegistroSolicitud);
  const RegistroMunicipio = useSelector((state) => state.RegistroMunicipio);
  const RegistroConvenios = useSelector((state) => state.RegistroConvenios);
  const RegistroBien = useSelector((state) => state.RegistroBien);
  const RegistroBanca = useSelector((state) => state.RegistroBanca);
  const correlativoTabla = () => {
    let codigocero = "0000000000";
    let contador = 1;
    if (RegistroSolicitud.allRegistroSolicitud.length > 0)
      contador =
        parseInt(
          RegistroSolicitud.allRegistroSolicitud[
            RegistroSolicitud.allRegistroSolicitud.length - 1
          ].numero_solicitud
        ) + 1;
    let posicion = codigocero.length - contador.toString().length;
    return codigocero.slice(0, posicion) + contador;
  };
  // Estados useState
  const [data, setData] = useState(servicios.empty);

  ///////////////////
  const [productDialog, setProductDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
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
  // --------------------
  // Formik
  const formik = useFormik({
    initialValues: data.numero_solicitud
      ? { ...data }
      : { ...data, numero_solicitud: correlativoTabla() },
    validate: (data) => {
      let errors = {};

      if (!data.numero_solicitud) {
        errors.numero_solicitud = "Numero Solicitud es requerido.";
      }
      if (!data.solicitante) {
        errors.solicitante = "Solicitante es requerido.";
      }
      if (!data.fecha_solicitud) {
        errors.fecha_solicitud = "Fecha solicitud es requerido.";
      }
      if (!data.hora_solicitud) {
        errors.hora_solicitud = "Hora solicitud es requerido.";
      }
      if (!data.tipo_banca) {
        errors.tipo_banca = "Tipo banca es requerido.";
      }
      if (!data.tipo_bien) {
        errors.tipo_bien = "Tipo bien es requerido.";
      }
      if (!data.persona_referencia) {
        errors.persona_referencia = "Persona referencia es requerido.";
      }
      if (!data.agencia) {
        errors.agencia = "Agencia es requerido.";
      }
      if (!data.municipio) {
        errors.municipio = "Municipio es requerido.";
      }

      if (!data.nombre_cliente) {
        errors.nombre_cliente = "Nombre cliente es requerido.";
      }
      if (!data.telefono_celular) {
        errors.munitelefono_celularcipio = "Telefono celular es requerido.";
      }
      if (!data.correo_electronico) {
        errors.correo_electronico = "Correo electronico es requerido.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
          data.correo_electronico
        )
      ) {
        errors.correo_electronico =
          "Dirección de correo electrónico no válida. E.g. example@email.com";
      }
      if (!data.tipo_requerimiento) {
        errors.tipo_requerimiento = "Ripo requerimiento es requerido.";
      }

      if (!data.tipo_asignacion) {
        errors.tipo_asignacion = "Tipo asignacion es requerido.";
      }

      if (!data.perito_asignado) {
        errors.perito_asignado = "Perito asignado es requerido.";
      }

      return errors;
    },
    onSubmit: (data) => {
      let cod_cliente = "";
      if (data.cod_cliente) {
        cod_cliente = data.cod_cliente.code + "," + data.nombre_cliente.name;
      }
    
      if (data.id_solicitud) {
        dispatch(
          putRegistroSolicitudSlice({
            ...data,
            solicitante: dataLogin.nombre,
            tipo_banca: data.tipo_banca.descripcion,
            tipo_bien: data.tipo_bien.descripcion,
            municipio: data.municipio.descripcion,
            cod_cliente: cod_cliente,
            nombre_cliente:
              data.nombre_cliente.code + "," + data.nombre_cliente.name,
            tipo_requerimiento: data.tipo_requerimiento.name,
            convenio: data.convenio.nombre_proyecto,
            tipo_asignacion: data.tipo_asignacion.name,
            perito_asignado: data.perito_asignado.name,
          })
        );
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
        setData(servicios.empty);
        setProductDialog(false);

        return;
      }

      dispatch(
        postRegistroSolicitudSlice({
          ...data,
          solicitante: dataLogin.nombre,
          tipo_banca: data.tipo_banca.descripcion,
          tipo_bien: data.tipo_bien.descripcion,
          municipio: data.municipio.descripcion,
          cod_cliente: cod_cliente,
          nombre_cliente:
            data.nombre_cliente.code + "," + data.nombre_cliente.name,
          tipo_requerimiento: data.tipo_requerimiento.name,
          convenio: data.convenio.nombre_proyecto,
          tipo_asignacion: data.tipo_asignacion.name,
          perito_asignado: data.perito_asignado.name,
        })
      );
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Product Updated",
        life: 3000,
      });
      setProductDialog(false);
      formik.resetForm();
    },
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
  //  -------------
  // Abrir un nuevo formulacio anexo3 de creacion
  const openNew = () => {
    setData({...data,solicitante: dataLogin ? dataLogin.nombre : "",
    fecha_solicitud: new Date(),
    hora_solicitud: new Date(),})
    setProductDialog(true);
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
      convenio: {nombre_proyecto:dataObj.convenio},
      perito_asignado: { name: dataObj.perito_asignado },
      fecha_solicitud: service.fecha(dataObj.fecha_solicitud, true),
      hora_solicitud: service.fecha(dataObj.hora_solicitud, true),
    });
    formik.initialValues = dataObj;
    setProductDialog(true);
  };
  // Confirmar la eliminacion de una fila
  const confirmDeleteProduct = (product) => {
    setData(product);
    setDeleteProductDialog(true);
  };
  // Cerrar el formulario 3 de creacion
  const hideDialog = () => {
    formik.resetForm();
    setData(servicios.empty);
    setProductDialog(false);
  };
  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editProduct(rowData)}
        />
      </div>
    );
  };

  const actionBodyTemplate2 = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning mt-2"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </div>
    );
  };
  // ----------------------------
  const deleteProduct = () => {
    dispatch(deleteRegistroSolicitudSlice(data));
    setDeleteProductDialog(false);
    setData(servicios.empty);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };
  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          {/* Alerta de notificacion */}
          <Toast ref={toast} />
          {/* Fin */}
          <Toolbar
            className="mb-4"
            left={LeftToolBarTemplate({
              openNew,
            })}
          ></Toolbar>
          {/* Fin */}
          {/* Tabla de todos los datos de banca */}
          <DataTableFormSolicitudSolicitante
            dt={dt}
            products={RegistroSolicitud.allRegistroSolicitud}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            globalFilter={globalFilter}
            header={HeaderTableDataInputText({
              setGlobalFilter: setGlobalFilter,
              TitleName: "Registro de Solicitud",
            })}
            editProductSuccess={editProduct}
            actionBodyTemplate={actionBodyTemplate}
            actionBodyTemplate2={actionBodyTemplate2}
            ColumnNameDataTable={servicios.ColumnNameDataTable}
          />
          {/* Fin */}
          {/* Modal formulario de creacion y editar */}

          <Anexo3
            productDialog={productDialog}
            hideDialog={hideDialog}
            saveProduct={formik.handleSubmit}
            data={formik.values}
            onInputChange={formik.handleChange}
            getFormErrorMessage={getFormErrorMessage}
            getMunicipo={RegistroMunicipio.allDescripcionMunicipio}
            countries={servicios.countries}
            GetBanca={RegistroBanca.allDescripcionBanca}
            GetBien={RegistroBien.allDescripcionBien}
            GetRequerimiento={servicios.GetRequerimiento}
            GetAsignacion={servicios.GetAsignacion}
            GetPeritos={servicios.GetPeritos}
            GetConvenio={RegistroConvenios.allDescripcionConvenios}
          />
          <DialogConfirmDeleteName
            ModalDialog={deleteProductDialog}
            OnClickTimes={hideDeleteProductDialog}
            OnClickCheck={deleteProduct}
            product={data}
          />
          {/* Fin */}
        </div>
      </div>
    </div>
  );
}

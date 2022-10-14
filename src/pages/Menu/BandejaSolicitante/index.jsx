import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// primereact
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";

// Component
import LeftToolBarTemplate from "../../../components/Molecula/LeftToolBarTemplate";
import DataTableForm from "../../../components/Molecula/DataTableForm";
import HeaderTableDataInputText from "../../../components/Molecula/HeaderTableDataInputText";
import DialogConfirmDeleteName from "../../../components/Organismo/DialogConfirmDeleteName";
import ModalCliente from "../../../components/Organismo/ModalCliente";

// Formik
import { useFormik } from "formik";
// Redux
import {
  deleteRegistroValoracionSlice,
  fetchAllRegistroValoracionSlice,
  postRegistroValoracionSlice,
  putRegistroValoracionSlice,
  fetchAllRegistroValoracionClienteSlice,
} from "../../../store/slices/RegistroValoracion";
// Servicios"
import service from "../../../service/Recursos";
import servicios from "./servicios";
const BandejaSolicitante = () => {
  const dataLogin = JSON.parse(localStorage.getItem("isLogger"));
  const toast = useRef(null);
  const dt = useRef(null);
  //Redux useSelector
  const RegistroValoracion = useSelector((state) => state.RegistroValoracion);

  // Estados useState
  const [data, setData] = useState(servicios.empty);

  ///////////////////
  const [datas, setDatas] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const dispatch = useDispatch();
  // UseEffect de todos los datos
  useEffect(() => {
    dispatch(fetchAllRegistroValoracionSlice());
    if (dataLogin) {
      dispatch(fetchAllRegistroValoracionClienteSlice(dataLogin.email));
    }
  }, [dispatch, dataLogin]);

  const formik = useFormik({
    initialValues: { ...data },
    validate: (data) => {
      let errors = {};

      if (!data.fecha_visita) {
        errors.fecha_visita = "Fecha visita es requerido.";
      }
      if (!data.fecha_pago) {
        errors.fecha_pago = "Fecha pago es requerido.";
      }
      if (!data.email) {
        errors.email = "Email es requerido.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email =
          "Dirección de correo electrónico no válida. E.g. example@email.com";
      }

      return errors;
    },
    onSubmit: (data) => {
      if (data.id_valoracion) {
        dispatch(
          putRegistroValoracionSlice({
            ...data,
            calificacion: data.calificacion ? data.calificacion.name : null,
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
        postRegistroValoracionSlice({
          ...data,
          calificacion: data.calificacion ? data.calificacion.name : null,
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
  const openNew = () => {
    setData({ ...data, email: dataLogin.email });
    setProductDialog(true);
  };
  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };
  const editProduct = (dataObj) => {
    console.log({
      ...dataObj,
      calificacion: dataObj.calificacion
        ? { name: dataObj.calificacion }
        : null,
      fecha_pago: service.fecha(dataObj.fecha_pago, true),
      fecha_visita: service.fecha(dataObj.fecha_visita, true),
    });
    setData({
      ...dataObj,
      calificacion: dataObj.calificacion
        ? { name: dataObj.calificacion }
        : null,
      fecha_pago: service.fecha(dataObj.fecha_pago, true),
      fecha_visita: service.fecha(dataObj.fecha_visita, true),
    });
    setProductDialog(true);
  };
  const confirmDeleteProduct = (product) => {
    setData(product);
    setDeleteProductDialog(true);
  };

  const hideDialog = () => {
    formik.resetForm();
    setData(servicios.empty);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
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
    dispatch(deleteRegistroValoracionSlice(data));
    setDeleteProductDialog(false);
    setData(servicios.empty);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const deleteSelectedProducts = () => {
    let _products = datas.filter((val) => !selectedProducts.includes(val));
    setDatas(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
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
          {/* Header de button Crear y elimar(La cantidad seleccionada) */}
          <Toolbar
            className="mb-4"
            left={LeftToolBarTemplate({
              openNew,
              confirmDeleteSelected,
              selectedProducts,
            })}
          ></Toolbar>
          {/* Fin */}
          {/* Tabla de todos los datos de banca */}
          {dataLogin.rol === "Administrador" ? (
            <DataTableForm
              dt={dt}
              products={RegistroValoracion.allRegistroValoracion}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              globalFilter={globalFilter}
              header={HeaderTableDataInputText({
                setGlobalFilter: setGlobalFilter,
                TitleName: "Valoracion de Perito",
              })}
              editProductSuccess={editProduct}
              actionBodyTemplate={actionBodyTemplate}
              actionBodyTemplate2={actionBodyTemplate2}
              ColumnNameDataTable={servicios.ColumnNameDataTable}
            />
          ) : null}

          {/* Fin */}
          {/* Modal formulario de creacion y editar */}
          {dataLogin.rol === "Cliente" ? (
            <DataTableForm
              dt={dt}
              products={RegistroValoracion.allRegistroValoracionCliente}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              globalFilter={globalFilter}
              header={HeaderTableDataInputText({
                setGlobalFilter: setGlobalFilter,
                TitleName: "Valoracion de Perito",
              })}
              editProductSuccess={editProduct}
              actionBodyTemplate={actionBodyTemplate}
              actionBodyTemplate2={actionBodyTemplate2}
              ColumnNameDataTable={servicios.ColumnNameDataTable}
            />
          ) : null}
          <ModalCliente
            productDialog={productDialog}
            hideDialog={hideDialog}
            saveProduct={formik.handleSubmit}
            data={formik.values}
            onInputChange={formik.handleChange}
            getFormErrorMessage={getFormErrorMessage}
            getCalificacion={servicios.cities}
            dataLogin={dataLogin}
          />

          {/* Fin */}
          {/* Modal de confirmacion para eliminar el dato */}
          <DialogConfirmDeleteName
            ModalDialog={deleteProductDialog}
            OnClickTimes={hideDeleteProductDialog}
            OnClickCheck={deleteProduct}
            product={data}
          />
          {/* Fin */}
          {/* Modal de confirmacion para eliminar los datos seleccionados de la tabla */}

          <DialogConfirmDeleteName
            ModalDialog={deleteProductsDialog}
            OnClickTimes={hideDeleteProductsDialog}
            OnClickCheck={deleteSelectedProducts}
          />
          {/* Fin */}
        </div>
      </div>
    </div>
  );
};

export default BandejaSolicitante;

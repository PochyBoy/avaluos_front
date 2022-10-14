import React, { useState, useEffect, useRef } from "react";
// primereact
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";

// Component
import LeftToolBarTemplate from "../../components/Molecula/LeftToolBarTemplate";
import DataTableForm from "../../components/Molecula/DataTableForm";
import HeaderTableDataInputText from "../../components/Molecula/HeaderTableDataInputText";
import DialogConfirmDeleteName from "../../components/Organismo/DialogConfirmDeleteName";
import ModalAsignacionSLA from "../../components/Organismo/ModalAsignacionSLA";
// Formik
import { useFormik } from "formik";
// Redux
import {
  deleteRegistroAsignacionSLASlice,
  fetchAllRegistroAsignacionSLASlice,
  postRegistroAsignacionSLASlice,
  putRegistroAsignacionSLASlice,
} from "../../store/slices/RegistroAsignacionSLA";
import { useDispatch, useSelector } from "react-redux";
export default function AsignacionSLA() {
  let empty = {
    id_asignacionsla: null,
    codigo: "",
    actividad: "",
    regla: "",
    tiempo: "",
    observacion: "",
    estado: false,
  };
  const ColumnNameDataTable = [
    {
      NameColumn: "codigo",
      BodyColumn: (rowData) => {
        return (
          <>
            <span className="p-column-title">Codigo</span>
            {rowData.codigo}
          </>
        );
      },
      StyleWidthColumn: 14,
    },
    {
      NameColumn: "actividad",
      BodyColumn: (rowData) => {
        return (
          <>
            <span className="p-column-title">Actividad</span>
            {rowData.actividad}
          </>
        );
      },
      StyleWidthColumn: 14,
    },
    {
      NameColumn: "regla",
      BodyColumn: (rowData) => {
        return (
          <>
            <span className="p-column-title">Regla</span>
            {rowData.regla}
          </>
        );
      },
      StyleWidthColumn: 14,
    },
    {
      NameColumn: "Tiempo",
      BodyColumn: (rowData) => {
        if (rowData.tiempo) {
          return (
            <>
              <span className="p-column-title">Tiempo</span>
              {rowData.tiempo}
            </>
          );
        }
      },
      StyleWidthColumn: 14,
    },
    {
      NameColumn: "observacion",
      BodyColumn: (rowData) => {
        return (
          <>
            <span className="p-column-title">Observacion</span>
            {rowData.observacion}
          </>
        );
      },
      StyleWidthColumn: 14,
    },
    {
      NameColumn: "estado",
      BodyColumn: (rowData) => {
        let data = "";
        if (rowData.estado === true) {
          data = "Activado";
        } else {
          data = "Desactivado";
        }
        return (
          <>
            <span className="p-column-title">Estado</span>
            {data}
          </>
        );
      },
      StyleWidthColumn: 14,
    },
  ];

  const toast = useRef(null);
  const dt = useRef(null);

  // Estados useState
  const [data, setData] = useState(empty);
  //Redux useSelector
  const RegistroAsignacionSLA = useSelector(
    (state) => state.RegistroAsignacionSLA
  );

  const correlativoTabla = () => {
    let codigocero = "0000000000";
    let contador = 1;
    if (RegistroAsignacionSLA.allRegistroAsignacionSLA.length > 0)
      contador =
        parseInt(
          RegistroAsignacionSLA.allRegistroAsignacionSLA[
            RegistroAsignacionSLA.allRegistroAsignacionSLA.length - 1
          ].codigo
        ) + 1;
    let posicion = codigocero.length - contador.toString().length;
    return codigocero.slice(0, posicion) + contador;
  };

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
    dispatch(fetchAllRegistroAsignacionSLASlice());
  }, [dispatch]);
  // Formik

  const formik = useFormik({
    initialValues:
      data.codigo.length > 0
        ? data
        : { ...data, codigo: correlativoTabla() } || {
            id_asignacionsla: null,
            codigo: "",
            actividad: "",
            regla: "",
            tiempo: "",
            observacion: "",
            estado: false,
          },
    validate: (data) => {
      let errors = {};

      if (!data.codigo) {
        errors.codigo = "Codigo es requerido.";
      }
      if (!data.actividad) {
        errors.actividad = "Actividad es requerido.";
      }
      if (!data.regla) {
        errors.regla = "Regla es requerido.";
      }
      if (!data.tiempo) {
        errors.tiempo = "Tiempo es requerido.";
      }
      if (!data.observacion) {
        errors.observacion = "Observacion es requerido.";
      }

      return errors;
    },
    onSubmit: (data) => {
      if (data.id_asignacionsla) {
        if (data.codigo.trim()) {
          dispatch(putRegistroAsignacionSLASlice(data));
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Product Updated",
            life: 3000,
          });
          setData(empty);
          setProductDialog(false);
        }
        return;
      }
      dispatch(postRegistroAsignacionSLASlice(data));
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
    setProductDialog(true);
  };
  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };
  const editProduct = (dataObj) => {
    setData({ ...dataObj });
    formik.initialValues = dataObj;
    setProductDialog(true);
  };
  const confirmDeleteProduct = (product) => {
    setData(product);
    setDeleteProductDialog(true);
  };

  const hideDialog = () => {
    formik.resetForm();
    setData(empty);
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
    dispatch(deleteRegistroAsignacionSLASlice(data));
    setDeleteProductDialog(false);
    setData(empty);
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
          <DataTableForm
            dt={dt}
            products={RegistroAsignacionSLA.allRegistroAsignacionSLA}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            globalFilter={globalFilter}
            header={HeaderTableDataInputText({
              setGlobalFilter: setGlobalFilter,
              TitleName: "Asignar SLA",
            })}
            editProductSuccess={editProduct}
            actionBodyTemplate={actionBodyTemplate}
            actionBodyTemplate2={actionBodyTemplate2}
            ColumnNameDataTable={ColumnNameDataTable}
          />
          {/* Fin */}
          {/* Modal formulario de creacion y editar */}
          <ModalAsignacionSLA
            productDialog={productDialog}
            hideDialog={hideDialog}
            saveProduct={formik.handleSubmit}
            data={formik.values}
            onInputChange={formik.handleChange}
            getFormErrorMessage={getFormErrorMessage}
            required={{
              codigo: true,
              actividad: true,
              regla: true,
              tiempo: true,
              observacion: true,
            }}
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
}

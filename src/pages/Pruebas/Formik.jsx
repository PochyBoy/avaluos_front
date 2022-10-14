import React, { useState, useRef } from "react";
// primereact
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";

// Component

import DataTableForm from "../../components/Molecula/DataTableForm";
import HeaderTableDataInputText from "../../components/Molecula/HeaderTableDataInputText";
import DialogConfirmDeleteName from "../../components/Organismo/DialogConfirmDeleteName";
import ModalCodigoDescriptionEstado from "../../components/Organismo/ModalCodigoDescriptionEstado";
import PruebaBtnsToolBar from "../../components/Molecula/PruebaBtnsToolBar";
// Formik
import { useFormik } from "formik";

export default function FormikFormDemo() {
  let empty = {
    id_banca: null,
    codigo: "",
    descripcion: "",
    estado: false,
  };
  const ColumnNameDataTable = [
    {
      NameColumn: "Codigo",
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
      NameColumn: "Descripcion",
      BodyColumn: (rowData) => {
        return (
          <>
            <span className="p-column-title">Descripcion</span>
            {rowData.descripcion}
          </>
        );
      },
      StyleWidthColumn: 64,
    },
    {
      NameColumn: "Estado",
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

  ///////////////////
  const [datas, setDatas] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);

  const formik = useFormik({
    initialValues: data || {
      id_banca: null,
      codigo: "",
      descripcion: "",
      estado: false,
    },
    validate: (data) => {
      let errors = {};

      if (!data.codigo) {
        errors.codigo = "Codigo is required.";
      }
      if (!data.descripcion) {
        errors.descripcion = "Descripción is required.";
      }
      return errors;
    },
    onSubmit: (data) => {
      // if (data.id_banca) {
      //   setDatas([...datas, data]);
      //   toast.current.show({
      //     severity: "success",
      //     summary: "Successful",
      //     detail: "Product Updated",
      //     life: 3000,
      //   });
      //   setData(empty);
      //   setProductDialog(false);

      //   return;
      // }
      setDatas([...datas, data]);
      setData(empty);
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
  /////////////////////////////////
  const codConsecutivo = (arr) => {
    return arr.length + 1;
  };
  const codConsecutivoDos = (arr) => {
    let codigo = "0000000000";
    let contador = arr.length + 1;
    let posicion = codigo.length - contador.toString().length;
    return codigo.slice(0, posicion) + contador;
  };

  const codConsecutivoTres = () => {
    let id = "";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 10; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };
  const correlativoTabla = (arr) => {
    let codigo = "0000000000";
    let contador = 1;
    if (arr.length > 0) contador = parseInt(arr[arr.length - 1].codigo) + 1;
    let posicion = codigo.length - contador.toString().length;
    return codigo.slice(0, posicion) + contador;
  };
  //  -------------
  const openNewUno = () => {
    setData({
      id_banca: null,
      codigo: codConsecutivo(datas),
      descripcion: "",
      estado: false,
    });
    setProductDialog(true);
  };
  const openNewDos = () => {
    setData({
      id_banca: null,
      codigo: codConsecutivoDos(datas),
      descripcion: "",
      estado: false,
    });
    setProductDialog(true);
  };
  const openNewTres = () => {
    setData({
      id_banca: null,
      codigo: codConsecutivoTres(datas),
      descripcion: "",
      estado: false,
    });
    setProductDialog(true);
  };
  const openNewCuatro = () => {
    setData({
      id_banca: null,
      codigo: correlativoTabla(datas),
      descripcion: "",
      estado: false,
    });
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
    let _products = datas.filter((val) => val.id !== data.id);
    setDatas(_products);
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
            left={PruebaBtnsToolBar({
              openNewUno,
              openNewDos,
              openNewTres,
              openNewCuatro,
              confirmDeleteSelected,
              selectedProducts,
            })}
          ></Toolbar>
          {/* Fin */}
          {/* Tabla de todos los datos de banca */}
          <DataTableForm
            dt={dt}
            products={datas}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            globalFilter={globalFilter}
            header={HeaderTableDataInputText({
              setGlobalFilter: setGlobalFilter,
              TitleName: "Registro de Banca",
            })}
            editProductSuccess={editProduct}
            actionBodyTemplate={actionBodyTemplate}
            actionBodyTemplate2={actionBodyTemplate2}
            ColumnNameDataTable={ColumnNameDataTable}
          />
          {/* Fin */}
          {/* Modal formulario de creacion y editar */}

          <ModalCodigoDescriptionEstado
            productDialog={productDialog}
            hideDialog={hideDialog}
            saveProduct={formik.handleSubmit}
            data={formik.values}
            onInputChange={formik.handleChange}
            getFormErrorMessage={getFormErrorMessage}
            required1={true}
            required2={true}
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

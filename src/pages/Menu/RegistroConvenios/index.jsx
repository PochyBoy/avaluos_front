import React, { useState, useEffect, useRef } from "react";
// primereact
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";

// Component
import LeftToolBarTemplate from "../../../components/Molecula/LeftToolBarTemplate";
import DataTableForm from "../../../components/Molecula/DataTableForm";
import HeaderTableDataInputText from "../../../components/Molecula/HeaderTableDataInputText";
import DialogConfirmDeleteName from "../../../components/Organismo/DialogConfirmDeleteName";
import Anexo2 from "../../../components/Organismo/Anexo2/Anexo2";

// Styles
import "./styles.scss";
// Servicios"
// import service from "../../../service/Recursos";

// Formik
import { useFormik } from "formik";
// Redux
import {
  fetchAllRegistroMunicipioSlice,
  fetchDescripcionRegistroMunicipioSlice,
  postRegistroMunicipioSlice,
  putRegistroMunicipioSlice,
} from "../../../store/slices/RegistroMunicipio";
import {
  fetchAllRegistroConveniosSlice,
  postRegistroConveniosSlice,
  putRegistroConveniosSlice,
  deleteRegistroConveniosSlice,
} from "../../../store/slices/RegistroConvenios";
import { fetchAllAvaluadoresSinFechaFin } from "../../../store/slices/RegistroAvaluadores";
import { useDispatch, useSelector } from "react-redux";
import ModalCodigoDescriptionEstado from "../../../components/Organismo/ModalCodigoDescriptionEstado";

export default function Convenio() {
  let empty = {
    id: null,
    municipio: null,
    perito: null,
    nombre_proyecto: "",
    fecha_inicio: null,
    fecha_fin: null,
  };
  let emptyMunicipio = {
    id_municipio: null,
    codigo: "",
    descripcion: "",
    estado: false,
  };

  const fecha = (DataFecha, booleanoData) => {
    if (booleanoData) {
      let fecha = new Date(DataFecha);
      fecha = fecha.setDate(fecha.getDate() + 1);
      fecha = new Date(fecha);
      return fecha;
    } else {
      let fecha = new Date(DataFecha);
      fecha = fecha.setDate(fecha.getDate() + 1);
      fecha = new Date(fecha);
      let getDate = fecha.getDate();
      let getMonth = fecha.getMonth() + 1;
      let getFullYear = fecha.getFullYear();
      return getDate + "-" + getMonth + "-" + getFullYear;
    }
  };

  const ColumnNameDataTable = [
    {
      NameColumn: "Municipio",
      BodyColumn: (rowData) => {
        return (
          <>
            <span className="p-column-title">Municipio</span>
            {rowData.municipio}
          </>
        );
      },
      StyleWidthColumn: 64,
    },

    {
      NameColumn: "Perito Avaluador",
      BodyColumn: (rowData) => {
        return (
          <>
            <span className="p-column-title">Perito Avaluador</span>
            {rowData.perito}
          </>
        );
      },
      StyleWidthColumn: 64,
    },

    {
      NameColumn: "Nombre de proyecto",
      BodyColumn: (rowData) => {
        return (
          <>
            <span className="p-column-title">Nombre de proyecto</span>
            {rowData.nombre_proyecto}
          </>
        );
      },
      StyleWidthColumn: 64,
    },
    {
      NameColumn: "Fecha Inicio",
      BodyColumn: (rowData) => {
        if (rowData.fecha_inicio) {
          return (
            <>
              <span className="p-column-title">Fecha Inicio</span>
              {fecha(rowData.fecha_inicio, false)}
            </>
          );
        }
      },
      StyleWidthColumn: 14,
    },
    {
      NameColumn: "Fecha Final",
      BodyColumn: (rowData) => {
        if (rowData.fecha_fin) {
          return (
            <>
              <span className="p-column-title">Fecha Final</span>
              {fecha(rowData.fecha_fin, false)}
            </>
          );
        }
        // return (
        //   <>
        //     <span className="p-column-title">Fecha Inicio</span>
        //     {rowData.fecha_inicio}
        //   </>
        // );
      },
      StyleWidthColumn: 14,
    },
  ];

  const toast = useRef(null);
  const dt = useRef(null);
  //Redux useSelector
  const RegistroMunicipio = useSelector((state) => state.RegistroMunicipio);
  const RegistroConvenios = useSelector((state) => state.RegistroConvenios);
  const RegistroAvaluadores = useSelector((state) => state.RegistroAvaluadores);

  const correlativoTabla = () => {
    let codigocero = "0000000000";
    let contador = 1;
    if (RegistroMunicipio.allRegistroMunicipio.length > 0)
      contador =
        parseInt(
          RegistroMunicipio.allRegistroMunicipio[
            RegistroMunicipio.allRegistroMunicipio.length - 1
          ].codigo
        ) + 1;
    let posicion = codigocero.length - contador.toString().length;
    return codigocero.slice(0, posicion) + contador;
  };
  // Estados useState
  const [data, setData] = useState(empty);
  const [dataMunicipio, setDataMunicipio] = useState(emptyMunicipio);
  const [datas, setDatas] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [productDialogMunicipio, setProductDialogMunicipio] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const dispatch = useDispatch();
  // UseEffect de todos los datos
  useEffect(() => {
    dispatch(fetchAllRegistroMunicipioSlice());
    dispatch(fetchAllRegistroConveniosSlice());
    dispatch(fetchDescripcionRegistroMunicipioSlice());
    dispatch(fetchAllAvaluadoresSinFechaFin());
  }, [dispatch]);

  // Formik

  const formik = useFormik({
    initialValues: data || {
      id: null,
      municipio: null,
      perito: null,
      nombre_proyecto: "",
      fecha_inicio: null,
      fecha_fin: null,
    },
    validate: (data) => {
      let errors = {};

      if (!data.municipio) {
        errors.municipio = "Municipio es requerido.";
      }
      if (!data.perito) {
        errors.perito = "Perito es requerido.";
      }
      if (!data.nombre_proyecto) {
        errors.nombre_proyecto = "Nombre de proyecto es requerido.";
      }
      if (!data.fecha_inicio) {
        errors.fecha_inicio = "Fecha de inicio es requerido.";
      }

      return errors;
    },
    onSubmit: (date) => {
      if (date.id) {
        dispatch(
          putRegistroConveniosSlice({
            ...date,
            municipio: date.municipio.descripcion,
            perito: date.perito.nombre,
          })
        );
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
        setData(empty);
        setProductDialog(false);

        return;
      }

      dispatch(
        postRegistroConveniosSlice({
          ...date,
          municipio: date.municipio.descripcion,
          perito: date.perito.nombre,
        })
      );
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

  //Municipio Add

  const formikMunicipio = useFormik({
    initialValues:
      dataMunicipio.codigo.length > 0
        ? dataMunicipio
        : { ...dataMunicipio, codigo: correlativoTabla() } || {
            id_municipio: null,
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
      if (data.id_municipio) {
        if (data.descripcion.trim()) {
          dispatch(putRegistroMunicipioSlice(data));
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

      dispatch(postRegistroMunicipioSlice({ ...data }));
      setProductDialogMunicipio(false);
      formik.resetForm();
    },
    enableReinitialize: true,
  });

  const isFormFieldValidMunicipio = (name) =>
    !!(formikMunicipio.touched[name] && formik.errors[name]);
  const getFormErrorMessageMunicipio = (name) => {
    return (
      isFormFieldValidMunicipio(name) && (
        <small className="p-error">{formikMunicipio.errors[name]}</small>
      )
    );
  };

  const openNew = () => {
    setProductDialog(true);
  };
  const openNewMunicipio = () => {
    setProductDialogMunicipio(true);
  };
  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };
  const editProduct = (dataObj) => {
    let fecha_fin = fecha(dataObj.fecha_fin, true);
    if (dataObj.fecha_fin === null) {
      fecha_fin = null;
    }
    setData({
      ...dataObj,
      municipio: { descripcion: dataObj.municipio },
      perito: { nombre: dataObj.perito },
      fecha_inicio: fecha(dataObj.fecha_inicio, true),
      fecha_fin: fecha_fin,
    });
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
  const hideDialogMunicipio = () => {
    formikMunicipio.resetForm();
    setDataMunicipio(emptyMunicipio);
    setProductDialogMunicipio(false);
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
    dispatch(deleteRegistroConveniosSlice(data));
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
            products={RegistroConvenios.allRegistroConvenios}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            globalFilter={globalFilter}
            header={HeaderTableDataInputText({
              setGlobalFilter: setGlobalFilter,
              TitleName: "Registro de Convenios",
            })}
            editProductSuccess={editProduct}
            actionBodyTemplate={actionBodyTemplate}
            actionBodyTemplate2={actionBodyTemplate2}
            ColumnNameDataTable={ColumnNameDataTable}
          />
          {/* Fin */}
          {/* Modal formulario de creacion y editar */}

          <Anexo2
            productDialog={productDialog}
            hideDialog={hideDialog}
            saveProduct={formik.handleSubmit}
            data={formik.values}
            onInputChange={formik.handleChange}
            getFormErrorMessage={getFormErrorMessage}
            getMunicipo={RegistroMunicipio.allDescripcionMunicipio}
            getAvaluador={RegistroAvaluadores.allAvaluadoresSinFechaFin}
            openNewMunicipio={openNewMunicipio}
          />
          <ModalCodigoDescriptionEstado
            productDialog={productDialogMunicipio}
            hideDialog={hideDialogMunicipio}
            saveProduct={formikMunicipio.handleSubmit}
            data={formikMunicipio.values}
            onInputChange={formikMunicipio.handleChange}
            getFormErrorMessage={getFormErrorMessageMunicipio}
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

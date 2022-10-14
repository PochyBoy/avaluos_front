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
import ModalRegistroDeSolicitantes from "../../../components/Organismo/ModalRegistroDeSolicitantes";
// Style
import "./styles.scss";
// Servicios"
import service from "../../../service/Recursos";

// Formik
import { useFormik } from "formik";
// Redux
import {
  fetchAllRegistroMunicipioSlice,
  fetchDescripcionRegistroMunicipioSlice,
} from "../../../store/slices/RegistroMunicipio";
import {
  fetchDescripcionRegistroProfesionSlice,
} from "../../../store/slices/RegistroProfesion";
import {
  deleteRegistroDeSolicitantesSlice,
  fetchAllRegistroDeSolicitantesSlice,
  postRegistroDeSolicitantesSlice,
  putRegistroDeSolicitantesSlice,
} from "../../../store/slices/RegistroDeSolicitantes";
import { useDispatch, useSelector } from "react-redux";
export default function RegistroDeSolicitantes() {
  let empty = {
    id_solicitante: null,
    fecha_inicio: null,
    fecha_fin: null,
    nombre: "",
    domicilio: "",
    municipio: null,
    profesion: "",
    correo_electronico: "",
    telefono_oficina: "",
    telefono_celular: "",
    ci: "",
    nit: "",
    estado: false,
  };

  const ColumnNameDataTable = [
    {
      NameColumn: "Fecha Inicio",
      BodyColumn: (rowData) => {
        if (rowData.fecha_inicio) {
          return (
            <>
              <span className="p-column-title">Fecha Inicio</span>
              {service.fecha(rowData.fecha_inicio, false)}
            </>
          );
        }
      },
      StyleWidthColumn: 14,
    },
    // {
    //   NameColumn: "Fecha Final",
    //   BodyColumn: (rowData) => {
    //     if (rowData.fecha_Fin) {
    //       return (
    //         <>
    //           <span className="p-column-title">Fecha Final</span>
    //           {fecha(rowData.fecha_Fin,false)}
    //         </>
    //       );
    //     }
    //   },
    //   StyleWidthColumn: 14,
    // },
    {
      NameColumn: "Nombre",
      BodyColumn: (rowData) => {
        return (
          <>
            <span className="p-column-title">Nombre</span>
            {rowData.nombre}
          </>
        );
      },
      StyleWidthColumn: 14,
    },
    {
      NameColumn: "Domicilio",
      BodyColumn: (rowData) => {
        return (
          <>
            <span className="p-column-title">Domicilio</span>
            {rowData.domicilio}
          </>
        );
      },
      StyleWidthColumn: 14,
    },
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
      StyleWidthColumn: 14,
    },
    {
      NameColumn: "Profesion",
      BodyColumn: (rowData) => {
        return (
          <>
            <span className="p-column-title">Profesion</span>
            {rowData.profesion}
          </>
        );
      },
      StyleWidthColumn: 14,
    },
    {
      NameColumn: "Email",
      BodyColumn: (rowData) => {
        return (
          <>
            <span className="p-column-title">Email</span>
            {rowData.correo_electronico}
          </>
        );
      },
      StyleWidthColumn: 14,
    },
    // {
    //   NameColumn: "Telefono Oficina",
    //   BodyColumn: (rowData) => {
    //     return (
    //       <>
    //         <span className="p-column-title">Telefono Oficina</span>
    //         {rowData.telefono_Oficina}
    //       </>
    //     );
    //   },
    //   StyleWidthColumn: 14,
    // },
    {
      NameColumn: "Telefono Celular",
      BodyColumn: (rowData) => {
        return (
          <>
            <span className="p-column-title">Telefono Celular</span>
            {rowData.telefono_celular}
          </>
        );
      },
      StyleWidthColumn: 14,
    },
    // {
    //   NameColumn: "Ci",
    //   BodyColumn: (rowData) => {
    //     return (
    //       <>
    //         <span className="p-column-title">Ci</span>
    //         {rowData.ci}
    //       </>
    //     );
    //   },
    //   StyleWidthColumn: 14,
    // },
    // {
    //   NameColumn: "Nit",
    //   BodyColumn: (rowData) => {
    //     return (
    //       <>
    //         <span className="p-column-title">Nit</span>
    //         {rowData.nit}
    //       </>
    //     );
    //   },
    //   StyleWidthColumn: 14,
    // },
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
  //Redux useSelector
  const RegistroDeSolicitantes = useSelector(
    (state) => state.RegistroDeSolicitantes
  );
  const RegistroMunicipio = useSelector((state) => state.RegistroMunicipio);
  const RegistroProfesion = useSelector((state) => state.RegistroProfesion);
  const [datas, setDatas] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const dispatch = useDispatch();
  // UseEffect de todos los datos
  useEffect(() => {
    dispatch(fetchAllRegistroMunicipioSlice());
    dispatch(fetchDescripcionRegistroMunicipioSlice());
    dispatch(fetchAllRegistroDeSolicitantesSlice());
    dispatch(fetchDescripcionRegistroProfesionSlice());
  }, [dispatch]);
  // Formik

  const formik = useFormik({
    initialValues: data || {
      id_solicitante: null,
      fecha_inicio: null,
      fecha_fin: null,
      nombre: "",
      domicilio: "",
      municipio: [],
      profesion: "",
      correo_electronico: "",
      telefono_oficina: "",
      telefono_celular: "",
      ci: "",
      nit: "",
      estado: false,
    },
    validate: (data) => {
      let errors = {};
      if (!data.fecha_inicio) {
        errors.fecha_inicio = "Fecha inicio es requerido.";
      }
      if (!data.fecha_fin) {
        errors.fecha_fin = "Fecha fin es requerido.";
      }
      if (!data.nombre) {
        errors.nombre = "Nombre es requerido.";
      }
      if (!data.domicilio) {
        errors.domicilio = "Domicilio es requerido.";
      }
      if (!data.municipio) {
        errors.municipio = "Municipio es requerido.";
      }
      if (!data.profesion) {
        errors.profesion = "Profesion es requerido.";
      }
      if (!data.correo_electronico) {
        errors.correo_electronico = "Correo electronico es requerido.";
      }
      if (!data.telefono_oficina) {
        errors.telefono_oficina = "Telefono oficina es requerido.";
      }
      if (!data.telefono_celular) {
        errors.telefono_celular = "Telefono celular es requerido.";
      }
      if (!data.ci) {
        errors.ci = "Ci es requerido.";
      }
      if (!data.nit) {
        errors.nit = "Nit es requerido.";
      }

      return errors;
    },
    onSubmit: (data) => {
      if (data.id_solicitante) {
        dispatch(
          putRegistroDeSolicitantesSlice({
            ...data,
            municipio: service.postMultiSelect(data.municipio, "descripcion"),
            profesion: data.profesion.descripcion,
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
        postRegistroDeSolicitantesSlice({
          ...data,
          municipio: service.postMultiSelect(data.municipio, "descripcion"),
          profesion: data.profesion.descripcion,
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
    setProductDialog(true);
  };
  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };
  const editProduct = (dataObj) => {
    setData({
      ...dataObj,
      municipio: service.updateMultiSelect(dataObj.municipio, "descripcion"),
      profesion: { descripcion: dataObj.profesion },
      fecha_inicio: service.fecha(dataObj.fecha_inicio, true),
      fecha_fin: service.fecha(dataObj.fecha_fin, true),
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
    dispatch(deleteRegistroDeSolicitantesSlice(data));
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
            products={RegistroDeSolicitantes.allRegistroDeSolicitantes}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            globalFilter={globalFilter}
            header={HeaderTableDataInputText({
              setGlobalFilter: setGlobalFilter,
              TitleName: "Registro de Solicitante",
            })}
            editProductSuccess={editProduct}
            actionBodyTemplate={actionBodyTemplate}
            actionBodyTemplate2={actionBodyTemplate2}
            ColumnNameDataTable={ColumnNameDataTable}
          />
          {/* Fin */}
          {/* Modal formulario de creacion y editar */}
          <ModalRegistroDeSolicitantes
            productDialog={productDialog}
            hideDialog={hideDialog}
            saveProduct={formik.handleSubmit}
            data={formik.values}
            onInputChange={formik.handleChange}
            getFormErrorMessage={getFormErrorMessage}
            GetMunicipo={RegistroMunicipio.allDescripcionMunicipio}
            GetProfesion={RegistroProfesion.allDescripcionProfesion}
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

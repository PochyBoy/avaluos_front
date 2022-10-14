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
import Anexo1 from "../../../components/Organismo/Anexo1/Anexo1";
import ModalCodigoDescriptionEstado from "../../../components/Organismo/ModalCodigoDescriptionEstado";
// Formik
import { useFormik } from "formik";
// Servicios"
import service from "../../../service/Recursos";

// Redux
import {
  fetchAllRegistroMunicipioSlice,
  fetchDescripcionRegistroMunicipioSlice,
  postRegistroMunicipioSlice,
  putRegistroMunicipioSlice,
} from "../../../store/slices/RegistroMunicipio";
import {
  deleteRegistroAvaluadoresSlice,
  fetchAllRegistroAvaluadoresSlice,
  postRegistroAvaluadoresSlice,
  putRegistroAvaluadoresSlice,
} from "../../../store/slices/RegistroAvaluadores";
import {
  fetchAllRegistroProfesionSlice,
  fetchDescripcionRegistroProfesionSlice,
} from "../../../store/slices/RegistroProfesion";
import { useDispatch, useSelector } from "react-redux";
export default function RegistroAvaluadores() {
  let empty = {
    id_avaluador: null,
    tipo_de_persona: { name: "Persona natural" },
    fecha_inicio: null,
    fecha_fin: null,
    nombre: "",
    representante_legal: "",
    domicilio_legal: "",
    domicilio: "",
    municipio: null,
    profesion: null,
    especialidad_valuacion: null,
    tiempo_experiencia: undefined,
    contrato: null,
    correo_electronico: "",
    telefono_oficina: "",
    telefono_celular: "",
    ci: "",
    nit: "",
    capacidad_avaluos: undefined,
  };
  let emptyMunicipio = {
    id_municipio: null,
    codigo: "",
    descripcion: "",
    estado: false,
  };
  const EspecialidadValuacion = [
    { name: "MAQUINARIA" },
    { name: "EQUIPOS Y VEHICULOS" },
    { name: "INMUEBLES URBANOS" },
    { name: "INMUEBLES RURALES" },
  ];
  const Contrato = [{ name: "SI" }, { name: "NO" }];

  const serviciosGeneral = [{ name: "Persona natural" }, { name: "Empresa" }];
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
      StyleWidthColumn: 5,
    },
    // {
    //   NameColumn: "Fecha Final",
    //   BodyColumn: (rowData) => {
    //  if (rowData.fecha_inicio) {
    //     return (
    //       <>
    //         <span className="p-column-title">Fecha Final</span>
    //         {fecha(rowData.fecha_inicio,true)}
    //       </>
    //     );
    //}
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
    // {
    //   NameColumn: "Representante Legal",
    //   BodyColumn: (rowData) => {
    //     return (
    //       <>
    //         <span className="p-column-title">Representante Legal</span>
    //         {rowData.representante_Legal}
    //       </>
    //     );
    //   },
    //   StyleWidthColumn: 14,
    // },
    // {
    //   NameColumn: "Domicilio Legal",
    //   BodyColumn: (rowData) => {
    //     return (
    //       <>
    //         <span className="p-column-title">Domicilio Legal</span>
    //         {rowData.domicilio_Legal}
    //       </>
    //     );
    //   },
    //   StyleWidthColumn: 14,
    // },
    // {
    //   NameColumn: "Domicilio",
    //   BodyColumn: (rowData) => {
    //     return (
    //       <>
    //         <span className="p-column-title">Domicilio</span>
    //         {rowData.domicilio}
    //       </>
    //     );
    //   },
    //   StyleWidthColumn: 14,
    // },
    // {
    //   NameColumn: "Municipio",
    //   BodyColumn: (rowData) => {
    //     return (
    //       <>
    //         <span className="p-column-title">Municipio</span>
    //         {rowData.municipio}
    //       </>
    //     );
    //   },
    //   StyleWidthColumn: 14,
    // },
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
      NameColumn: "Especialidad Valuacion",
      BodyColumn: (rowData) => {
        return (
          <>
            <span className="p-column-title">Especialidad Valuacion</span>
            {rowData.especialidad_valuacion}
          </>
        );
      },
      StyleWidthColumn: 14,
    },
    // {
    //   NameColumn: "Tiempo Experiencia",
    //   BodyColumn: (rowData) => {
    //     return (
    //       <>
    //         <span className="p-column-title">Tiempo Experiencia</span>
    //         {rowData.tiempo_Experiencia}
    //       </>
    //     );
    //   },
    //   StyleWidthColumn: 14,
    // },
    // {
    //   NameColumn: "Contrato",
    //   BodyColumn: (rowData) => {
    //     return (
    //       <>
    //         <span className="p-column-title">Contrato</span>
    //         {rowData.contrato.name}
    //       </>
    //     );
    //   },
    //   StyleWidthColumn: 14,
    // },
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
    // {
    //   NameColumn: "Capacidad Avaluos",
    //   BodyColumn: (rowData) => {
    //     return (
    //       <>
    //         <span className="p-column-title">Capacidad Avaluos</span>
    //         {rowData.capacidad_avaluos}
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
  //Redux useSelector
  const RegistroMunicipio = useSelector((state) => state.RegistroMunicipio);
  const RegistroAvaluadores = useSelector((state) => state.RegistroAvaluadores);
  const RegistroProfesion = useSelector((state) => state.RegistroProfesion);
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
    dispatch(fetchDescripcionRegistroMunicipioSlice());
    dispatch(fetchAllRegistroAvaluadoresSlice());
    dispatch(fetchDescripcionRegistroProfesionSlice());
    dispatch(fetchAllRegistroProfesionSlice());
  }, [dispatch]);
  // Formik
  const formik = useFormik({
    initialValues: data || {
      id_avaluador: null,
      tipo_de_persona: { name: "Persona natural" },
      fecha_inicio: null,
      fecha_fin: null,
      nombre: "",
      representante_legal: "",
      domicilio_legal: "",
      domicilio: "",
      municipio: null,
      profesion: null,
      especialidad_valuacion: null,
      tiempo_experiencia: undefined,
      contrato: null,
      correo_electronico: "",
      telefono_oficina: "",
      telefono_celular: "",
      ci: "",
      nit: "",
      capacidad_avaluos: undefined,
    },
    validate: (data) => {
      let errors = {};

      if (!data.fecha_inicio) {
        errors.fecha_inicio = "Fecha inicio es requerido.";
      }
      if (data.fecha_fin) {
        if (data.fecha_inicio > data.fecha_fin) {
          errors.fecha_fin = "Fecha fin no debe ser menor que la fecha inicio";
        }
      }
      if (!data.nombre) {
        errors.nombre = "Nombre es requerido.";
      }
      // if (!data.representante_legal) {
      //   errors.representante_legal = "representante_legal es requerido.";
      // }
      if (!data.domicilio_legal) {
        errors.domicilio_legal = "Domicilio legal es requerido.";
      }
      // if (!data.domicilio) {
      //   errors.domicilio = "domicilio es requerido.";
      // }
      if (!data.municipio) {
        errors.municipio = "Municipio es requerido.";
      }
      if (!data.profesion) {
        errors.profesion = "Profesion es requerido.";
      }
      if (!data.especialidad_valuacion) {
        errors.especialidad_valuacion = "Especialidad valuacion es requerido.";
      }
      if (!data.tiempo_experiencia) {
        errors.tiempo_experiencia = "Tiempo experiencia es requerido.";
      } else if (data.tiempo_experiencia > 40) {
        errors.tiempo_experiencia = "No debe ser mayor a 40 años";
      }
      if (!data.contrato) {
        errors.contrato = "Contrato es requerido.";
      }
      if (!data.correo_electronico) {
        errors.correo_electronico = "Correo Electronico es requerido.";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
          data.correo_electronico
        )
      ) {
        errors.correo_electronico =
          "Dirección de correo electrónico no válida. E.g. example@email.com";
      }
      if (!data.telefono_oficina) {
        errors.telefono_oficina = "Télefono oficina es requerido.";
      }
      // else if (!/^\d+$/i.test(data.telefono_oficina)) {
      //   errors.telefono_oficina = "Ingresar numeros enteros.";
      // }
      if (!data.telefono_celular) {
        errors.telefono_celular = "Télefono celular es requerido.";
      }
      // else if (!/^\d+$/i.test(data.telefono_celular)) {
      //   errors.telefono_celular = "Ingresar numeros enteros.";
      // }

      if (formik.values.tipo_de_persona.name === "Persona natural") {
        if (!data.ci) {
          errors.ci = "Ci es requerido.";
        }
      }
      if (formik.values.tipo_de_persona.name === "Empresa") {
        if (!data.nit) {
          errors.nit = "Nit es requerido.";
        }
      }

      if (!data.capacidad_avaluos) {
        errors.capacidad_avaluos = "Capacidad avaluos es requerido.";
      } else if (!/^\d+$/i.test(data.capacidad_avaluos)) {
        errors.capacidad_avaluos = "Ingresar numeros enteros.";
      } else if (data.capacidad_avaluos > 12) {
        errors.capacidad_avaluos = "No debe ser mayor a 12 meses";
      }

      return errors;
    },
    onSubmit: (date) => {
      if (date.id_avaluador) {
        dispatch(
          putRegistroAvaluadoresSlice({
            ...date,
            tipo_de_persona: date.tipo_de_persona.name,
            municipio: date.municipio.descripcion,
            profesion: date.profesion.descripcion,
            contrato: date.contrato.name,
            especialidad_valuacion: date.especialidad_valuacion.name,
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
        postRegistroAvaluadoresSlice({
          ...date,
          tipo_de_persona: date.tipo_de_persona.name,
          municipio: date.municipio.descripcion,
          profesion: date.profesion.descripcion,
          contrato: date.contrato.name,
          especialidad_valuacion: date.especialidad_valuacion.name,
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
    let especialidad_valuacion = EspecialidadValuacion.find(
      (item) => item.name === dataObj.especialidad_valuacion
    );
    let contrato = Contrato.find((item) => item.name === dataObj.contrato);
    setData({
      ...dataObj,
      tipo_de_persona: { name: dataObj.tipo_de_persona },
      contrato: contrato,
      municipio: { descripcion: dataObj.municipio },
      profesion: { descripcion: dataObj.profesion },
      especialidad_valuacion: especialidad_valuacion,
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
    dispatch(deleteRegistroAvaluadoresSlice(data));
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
            products={RegistroAvaluadores.allRegistroAvaluadores}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            globalFilter={globalFilter}
            header={HeaderTableDataInputText({
              setGlobalFilter: setGlobalFilter,
              TitleName: "Registro de Avaluadores",
            })}
            editProductSuccess={editProduct}
            actionBodyTemplate={actionBodyTemplate}
            actionBodyTemplate2={actionBodyTemplate2}
            ColumnNameDataTable={ColumnNameDataTable}
          />
          {/* Fin */}
          {/* Modal formulario de creacion y editar */}

          <Anexo1
            productDialog={productDialog}
            hideDialog={hideDialog}
            saveProduct={formik.handleSubmit}
            data={formik.values}
            onInputChange={formik.handleChange}
            getFormErrorMessage={getFormErrorMessage}
            GetMunicipo={RegistroMunicipio.allDescripcionMunicipio}
            GetProfesion={RegistroProfesion.allDescripcionProfesion}
            GetEspecialidad={EspecialidadValuacion}
            GetContrato={Contrato}
            GetServiciosGeneral={serviciosGeneral}
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

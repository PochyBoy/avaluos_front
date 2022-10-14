import React, { useState, useEffect, useRef } from "react";
// primereact
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

// Component
import DialogConfirmDeleteName from "../../components/Organismo/DialogConfirmDeleteName";
import ModalCodigoNombreEmailRolEstado from "../../components/Organismo/ModalCodigoNombreEmailRolEstado";
import DataTableForm from "../../components/Molecula/DataTableForm";
import LeftToolBarTemplate from "../../components/Molecula/LeftToolBarTemplate";
import HeaderTableDataInputText from "../../components/Molecula/HeaderTableDataInputText";

// Styles
// import "./styles.scss";
// Formik
import { useFormik } from "formik";
// Redux
import {
  deleteRegistroUsuariosSlice,
  fetchAllRegistroUsuariosSlice,
  postRegistroUsuariosSlice,
  putRegistroUsuariosSlice,
} from "../../store/slices/UsuariosDB";
import { useDispatch, useSelector } from "react-redux";

export default function RegistroUsuarioAD() {
  const rol = [
    { name: "Administrador" },
    { name: "Empleado" },
    { name: "AsistenteRRHH" },
    { name: "GerenteRRHH" },
  ];

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
      NameColumn: "nombre",
      BodyColumn: (rowData) => {
        return (
          <>
            <span className="p-column-title">Nombre</span>
            {rowData.nombre}
          </>
        );
      },
      StyleWidthColumn: 44,
    },
    {
      NameColumn: "Correo electronico",
      BodyColumn: (rowData) => {
        return (
          <>
            <span className="p-column-title">Correo electronico</span>
            {rowData.email}
          </>
        );
      },
      StyleWidthColumn: 14,
    },
    {
      NameColumn: "rol",
      BodyColumn: (rowData) => {
        return (
          <>
            <span className="p-column-title">Rol</span>
            {rowData.rol}
          </>
        );
      },
      StyleWidthColumn: 14,
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
  let empty = {
    id_usuario: null,
    codigo: "",
    nombre: "",
    email: "",
    rol: null,
    estado: false,
  };

  const toast = useRef(null);
  const dt = useRef(null);
  //Redux useSelector
  const UsuariosDB = useSelector((state) => state.UsuariosDB);

  const correlativoTabla = () => {
    let codigocero = "0000000000";
    let contador = 1;
    if (UsuariosDB.allUsuarios.length > 0)
      contador =
        parseInt(
          UsuariosDB.allUsuarios[UsuariosDB.allUsuarios.length - 1].codigo
        ) + 1;
    let posicion = codigocero.length - contador.toString().length;
    return codigocero.slice(0, posicion) + contador;
  };
  // Estados useState
  const [data, setData] = useState(empty);

  const [datas, setDatas] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const dispatch = useDispatch();
  // UseEffect de todos los datos
  useEffect(() => {
    dispatch(fetchAllRegistroUsuariosSlice());
  }, [dispatch]);

  // Formik

  const formik = useFormik({
    initialValues:
      data.codigo.length > 0
        ? data
        : { ...data, codigo: correlativoTabla() } || {
            id_usuario: null,
            codigo: "",
            nombre: "",
            email: "",
            rol: null,
            estado: false,
          },
    validate: (data) => {
      let errors = {};

      if (!data.codigo) {
        errors.codigo = "Codigo es requerido.";
      }
      if (!data.nombre) {
        errors.nombre = "Nombre es requerido.";
      }
      if (!data.email) {
        errors.email = "Correo electronico es requerido.";
      }
      if (!data.rol) {
        errors.rol = "Rol es requerido.";
      }

      return errors;
    },
    onSubmit: (data) => {
      if (data.id_usuario) {
        dispatch(putRegistroUsuariosSlice({ ...data, rol: data.rol.name }));
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
      let newData = {
        codigo: data.codigo,
        nombre: data.nombre,
        email: data.email,
        rol: data.rol.name,
        estado: data.estado,
      };
      dispatch(postRegistroUsuariosSlice(newData));
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
    setData({ ...dataObj, rol: { name: dataObj.rol } });
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
    dispatch(deleteRegistroUsuariosSlice(data));
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
          <Toast ref={toast} />
          <Toolbar
            className="mb-4"
            left={LeftToolBarTemplate({
              openNew,
              confirmDeleteSelected,
              selectedProducts,
            })}
          ></Toolbar>

          <DataTableForm
            dt={dt}
            products={UsuariosDB.allUsuarios}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            globalFilter={globalFilter}
            header={HeaderTableDataInputText({
              setGlobalFilter: setGlobalFilter,
              TitleName: "Registro de Usuarios",
            })}
            editProductSuccess={editProduct}
            actionBodyTemplate={actionBodyTemplate}
            actionBodyTemplate2={actionBodyTemplate2}
            ColumnNameDataTable={ColumnNameDataTable}
          />

          <ModalCodigoNombreEmailRolEstado
            productDialog={productDialog}
            hideDialog={hideDialog}
            saveProduct={formik.handleSubmit}
            data={formik.values}
            onInputChange={formik.handleChange}
            getFormErrorMessage={getFormErrorMessage}
            rol={rol}
          />

          {/* Modal de confirmacion para eliminar el dato */}
          <DialogConfirmDeleteName
            ModalDialog={deleteProductDialog}
            OnClickTimes={hideDeleteProductDialog}
            OnClickCheck={deleteProduct}
            product={data}
          />
          {/* Modal de confirmacion para eliminar los datos seleccionados de la tabla */}

          <DialogConfirmDeleteName
            ModalDialog={deleteProductsDialog}
            OnClickTimes={hideDeleteProductsDialog}
            OnClickCheck={deleteSelectedProducts}
          />
        </div>
      </div>
    </div>
  );
}

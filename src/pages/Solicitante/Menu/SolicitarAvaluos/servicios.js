import React from "react";
const emptyValidacionPerito = {
  responsable: "",
  nombre: "",
  email: "",
  direccion: "",
};

let empty = {
  id_solicitud: null,
  numero_solicitud: "",
  solicitante: "",
  fecha_solicitud: null,
  hora_solicitud: null,
  tipo_banca: "",
  tipo_bien: "",
  persona_referencia: "",
  agencia: "",
  municipio: null,
  cod_cliente: null,
  nombre_cliente: null,
  telefono_celular: "",
  correo_electronico: "",
  tipo_requerimiento: null,
  convenio: null,
  tipo_asignacion: null,
  perito_asignado: null,
};
let emptyLocalizacion = {
  id_ubicaciondesolicitud: null,
  numerodesolicitante: "",
  responsable: "",
  nombre: "",
  email: "",
  direccion: "",
  coordenadasX: 0,
  coordenadasY: 0,
  puntoX: null,
  puntoY: null,
};
const GetRequerimiento = [
  { name: "AVALÚO NUEVO" },
  { name: "AVALÚO BIENES ADJUDICADOS" },
  { name: "AVALÚO DACIÓN EN PAGO" },
  { name: "AVALÚO DE OBRA (DESEMBOLSO PARCIAL)" },
  { name: "MODIFICACIÓN DE AVALÚO" },
  { name: "REAVALÚO" },
];
const GetAsignacion = [{ name: "AUTOMÁTICO" }, { name: "MANUAL" }];
const countries = [
  { name: "Virtudes Ruiz", code: "E1" },
  { name: "Jose Manuel Gascon", code: "E2" },
  { name: "Ander Ramiro", code: "E3" },
  { name: "Francisco Javier Molero", code: "E4" },
  { name: "Jose Ripoll", code: "E5" },
  { name: "Mateo Torregrosa", code: "E6" },
  { name: "Jose Gabriel Ballester", code: "E7" },
  { name: "Rodrigo Zheng", code: "E8" },
  { name: "Joel Alamo", code: "E9" },
  { name: "Roberto Carlos Reig", code: "E10" },
];
const GetPeritos = [
  { name: "Juan Ignacio Galvez" },
  { name: "Patricio de Dios" },
  { name: "Eduardo Parrilla" },
  { name: "Leandro Hervas" },
  { name: "Saturnino Puente" },
];
const ColumnNameDataTable = [
  {
    NameColumn: "Numero Solicitud",
    BodyColumn: (rowData) => {
      return (
        <>
          <span className="p-column-title">Numero Solicitud</span>
          {rowData.numero_solicitud}
        </>
      );
    },
    StyleWidthColumn: 14,
  },
  {
    NameColumn: "Solicitante",
    BodyColumn: (rowData) => {
      return (
        <>
          <span className="p-column-title">Solicitante</span>
          {rowData.solicitante}
        </>
      );
    },
    StyleWidthColumn: 14,
  },
  // {
  //   NameColumn: "Fecha Solicitud",
  //   BodyColumn: (rowData) => {
  //     return (
  //       <>
  //         <span className="p-column-title">Fecha Solicitud</span>
  //         {rowData.fecha_solicitud}
  //       </>
  //     );
  //   },
  //   StyleWidthColumn: 14,
  // },
  // {
  //   NameColumn: "Hora Solicitud",
  //   BodyColumn: (rowData) => {
  //     return (
  //       <>
  //         <span className="p-column-title">Hora Solicitud</span>
  //         {rowData.hora_solicitud}
  //       </>
  //     );
  //   },
  //   StyleWidthColumn: 14,
  //  },
  // {
  //   NameColumn: "Tipo banca",
  //   BodyColumn: (rowData) => {
  //     return (
  //       <>
  //         <span className="p-column-title">Tipo banca</span>
  //         {rowData.tipo_banca}
  //       </>
  //     );
  //   },
  //   StyleWidthColumn: 14,
  // },
  // {
  //   NameColumn: "Tipo Bien",
  //   BodyColumn: (rowData) => {
  //     return (
  //       <>
  //         <span className="p-column-title">Tipo Bien</span>
  //         {rowData.tipo_bien}
  //       </>
  //     );
  //   },
  //   StyleWidthColumn: 14,
  // },
  // {
  //   NameColumn: "Persona Referencia",
  //   BodyColumn: (rowData) => {
  //     return (
  //       <>
  //         <span className="p-column-title">Persona Referencia</span>
  //         {rowData.persona_referencia}
  //       </>
  //     );
  //   },
  //   StyleWidthColumn: 14,
  // },
  {
    NameColumn: "Agencia",
    BodyColumn: (rowData) => {
      return (
        <>
          <span className="p-column-title">Agencia</span>
          {rowData.agencia}
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
  // {
  //   NameColumn: "Cod Cliente",
  //   BodyColumn: (rowData) => {
  //     return (
  //       <>
  //         <span className="p-column-title">Cod Cliente</span>
  //         {rowData.cod_cliente}
  //       </>
  //     );
  //   },
  //   StyleWidthColumn: 14,
  // },
  {
    NameColumn: "Nombre Cliente",
    BodyColumn: (rowData) => {
      return (
        <>
          <span className="p-column-title">Nombre Cliente</span>
          {rowData.nombre_cliente}
        </>
      );
    },
    StyleWidthColumn: 14,
  },
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
  //   NameColumn: "Correo Electronico",
  //   BodyColumn: (rowData) => {
  //     return (
  //       <>
  //         <span className="p-column-title">Correo Electronico</span>
  //         {rowData.correo_electronico}
  //       </>
  //     );
  //   },
  //   StyleWidthColumn: 14,
  // },
  // {
  //   NameColumn: "Tipo Requerimiento",
  //   BodyColumn: (rowData) => {
  //     return (
  //       <>
  //         <span className="p-column-title">Tipo Requerimiento</span>
  //         {rowData.tipo_requerimiento}
  //       </>
  //     );
  //   },
  //   StyleWidthColumn: 14,
  // },
  {
    NameColumn: "Convenio",
    BodyColumn: (rowData) => {
      return (
        <>
          <span className="p-column-title">Convenio</span>
          {rowData.convenio}
        </>
      );
    },
    StyleWidthColumn: 14,
  },
  // {
  //   NameColumn: "Tipo Asignacion",
  //   BodyColumn: (rowData) => {
  //     return (
  //       <>
  //         <span className="p-column-title">Tipo Asignacion</span>
  //         {rowData.tipo_asignación}
  //       </>
  //     );
  //   },
  //   StyleWidthColumn: 14,
  // },
  {
    NameColumn: "Perito Asignado",
    BodyColumn: (rowData) => {
      return (
        <>
          <span className="p-column-title">Tipo Asignacion</span>
          {rowData.perito_asignado}
        </>
      );
    },
    StyleWidthColumn: 14,
  },
];
export default {
  emptyValidacionPerito,
  GetRequerimiento,
  GetAsignacion,
  countries,
  GetPeritos,
  ColumnNameDataTable,
  empty,
  emptyLocalizacion,
};
//servicios

import React from "react";
import service from "../../../service/Recursos";
let empty = {
  id_valoracion: null,
  fecha_visita: null,
  fecha_pago: null,
  calificacion: null,
  email: "",
  comentario: "",
  conformidad: false,
};
const ColumnNameDataTable = [
  {
    NameColumn: "fecha_visita",
    BodyColumn: (rowData) => {
      return (
        <>
          <span className="p-column-title">fecha_visita</span>
          {service.fecha(rowData.fecha_visita, false)}
        </>
      );
    },
    StyleWidthColumn: 14,
  },
  {
    NameColumn: "fecha_pago",
    BodyColumn: (rowData) => {
      return (
        <>
          <span className="p-column-title">fecha_pago</span>
          {service.fecha(rowData.fecha_pago, false)}
        </>
      );
    },
    StyleWidthColumn: 14,
  },
  {
    NameColumn: "calificacion",
    BodyColumn: (rowData) => {
      return (
        <>
          <span className="p-column-title">calificacion</span>
          {rowData.calificacion}
        </>
      );
    },
    StyleWidthColumn: 14,
  },
  {
    NameColumn: "email",
    BodyColumn: (rowData) => {
      return (
        <>
          <span className="p-column-title">email</span>
          {rowData.email}
        </>
      );
    },
    StyleWidthColumn: 24,
  },
  {
    NameColumn: "comentario",
    BodyColumn: (rowData) => {
      return (
        <>
          <span className="p-column-title">comentario</span>
          {rowData.comentario}
        </>
      );
    },
    StyleWidthColumn: 44,
  },

  {
    NameColumn: "conformidad",
    BodyColumn: (rowData) => {
      let data = "";
      if (rowData.conformidad === true) {
        data = "Si";
      } else {
        data = "No";
      }
      return (
        <>
          <span className="p-column-title">conformidad</span>
          {data}
        </>
      );
    },
    StyleWidthColumn: 14,
  },
];
const cities = [
  { name: 1 },
  { name: 2 },
  { name: 3 },
  { name: 4 },
  { name: 5 },
];
export default {
  empty,
  ColumnNameDataTable,
  cities,
};

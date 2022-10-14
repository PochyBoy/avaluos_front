import { configureStore } from "@reduxjs/toolkit";
import UsuariosDB from "./slices/UsuariosDB";
import RegistroBanca from "./slices/RegistroBanca";
import RegistroBien from "./slices/RegistroBien";
import RegistroAsignado from "./slices/RegistroAsignado";
import RegistroTipoDeBien from "./slices/RegistroTipoDeBien";
import RegistroProfesion from "./slices/RegistroProfesion";
import RegistroAsignacionSLA from "./slices/RegistroAsignacionSLA";
import RegistroDeSolicitantes from "./slices/RegistroDeSolicitantes";
import RegistroMunicipio from "./slices/RegistroMunicipio";
import RegistroConvenios from "./slices/RegistroConvenios";
import RegistroAvaluadores from "./slices/RegistroAvaluadores";
import RegistroSolicitud from "./slices/RegistroSolicitud";
import RegistroTipoDePersona from "./slices/RegistroTipoDePersona";
import RegistroLocalizacion from "./slices/RegistroLocalizacion";
import RegistroValoracion from "./slices/RegistroValoracion";



import Login from "./slices/Login";
export const store = configureStore({
  reducer: {
    UsuariosDB,
    RegistroBanca,
    RegistroBien,
    Login,
    RegistroAsignado,
    RegistroTipoDeBien,
    RegistroProfesion,
    RegistroAsignacionSLA,
    RegistroDeSolicitantes,
    RegistroMunicipio,
    RegistroConvenios,
    RegistroAvaluadores,
    RegistroSolicitud,
    RegistroTipoDePersona,
    RegistroLocalizacion,
    RegistroValoracion
  },
});

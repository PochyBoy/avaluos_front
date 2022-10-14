import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const LoginSlice = createSlice({
  name: "Login",
  initialState: {
    allLogin: [
      {
        nombre: "Julio Mazuelos Administrador",
        email: "admin@admin.com",
        password: "admin",
        rol: "Administrador",
      },
      {
        nombre: "Julio Mazuelos Gestor de Roles",
        email: "Roles@Roles.com",
        password: "123",
        rol: "Gestor de Roles",
      },
      {
        nombre: "Kenneth Vargas Cliente",
        email: "cliente@cliente.com",
        password: "123",
        rol: "Cliente",
      },
      {
        nombre: "Julio Mazuelos Experto en avalúos",
        email: "experto@experto.com",
        password: "123",
        rol: "Experto en avalúos",
      },
      {
        nombre: "Kenneth Vargas Solicitante",
        email: "solicitante@solicitante.com",
        password: "123",
        rol: "Solicitante",
      },
      {
        nombre: "Julio Mazuelos Perito en avalúos",
        email: "perito@perito.com",
        password: "123",
        rol: "Perito en avalúos",
      },
      // {
      //   nombre: "Julio Mazuelos Perito en avalúos",
      //   email: "consultas@consultas.com",
      //   password: "123",
      //   rol: "Consultas",
      // },
    ],
    DatoLogeado: {},
  },
  reducers: {
    setLogin: (state, action) => {
      state.DatoLogeado = action.payload;
    },
  },
});

export default LoginSlice.reducer;
export const { setLogin } = LoginSlice.actions;

export const DataLogin = (data) => async (dispatch) => {
  return await axios
    .post("api/login", {
      email: data.email,
      password: data.password,
    })
    .then((res) => {
      dispatch(setLogin(res.data));
    })

    .catch((err) => console.log(err));
};
export const LimpiarLogin = () => async (dispatch) => {

      dispatch(setLogin({}));
  
};

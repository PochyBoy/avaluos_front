import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registroAsignacionSLASlice = createSlice({
  name: "registroRegistroAsignacionSLA",
  initialState: {
    allRegistroAsignacionSLA: [],
  },
  reducers: {
    setRegistroAsignacionSLAAll: (state, action) => {
      state.allRegistroAsignacionSLA = action.payload;
    },
  },
});

export default registroAsignacionSLASlice.reducer;
export const { setRegistroAsignacionSLAAll } = registroAsignacionSLASlice.actions;

export const fetchAllRegistroAsignacionSLASlice = () => async (dispatch) => {
  await axios
    .get("/api/asignacionsla")
    .then((res) => {
      dispatch(setRegistroAsignacionSLAAll(res.data));
    })
    .catch((error) => console.log(error));
};

export const postRegistroAsignacionSLASlice = (data) => (dispatch) => {
  try {
    axios
      .post("/api/asignacionsla", {
        codigo: data.codigo,
        actividad: data.actividad,
        regla: data.regla,
        tiempo: data.tiempo,//
        observacion: data.observacion,
        estado:data.estado
      })
      .then(async () => {
        await dispatch(fetchAllRegistroAsignacionSLASlice()).catch((e) =>
          console.log(e)
        );
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
export const putRegistroAsignacionSLASlice = (data) => (dispatch) => {
  try {
    axios
      .put(`/api/asignacionsla/${data.id_asignacionsla}`, {
        codigo: data.codigo,
        actividad: data.actividad,
        regla: data.regla,
        tiempo: data.tiempo,//data.tiempo
        observacion: data.observacion,
        estado:data.estado
      })
      .then(async () => {
        await dispatch(fetchAllRegistroAsignacionSLASlice());
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};
export const deleteRegistroAsignacionSLASlice = (data) => (dispatch) => {
  try {
    axios
      .delete(`/api/asignacionsla/${data.id_asignacionsla}`)
      .then(async () => await dispatch(fetchAllRegistroAsignacionSLASlice()))
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};

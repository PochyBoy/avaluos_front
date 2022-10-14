import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registroAsignadoSlice = createSlice({
  name: "registroAsignado",
  initialState: {
    allRegistroAsignado: [],
  },
  reducers: {
    setRegistroAsignadoAll: (state, action) => {
      state.allRegistroAsignado = action.payload;
    },
  },
});

export default registroAsignadoSlice.reducer;
export const { setRegistroAsignadoAll } = registroAsignadoSlice.actions;

export const fetchAllRegistroAsignadoSlice = () => async (dispatch) => {
  await axios
    .get("/api/asignacion")
    .then((res) => {
      dispatch(setRegistroAsignadoAll(res.data));
    })
    .catch((error) => console.log(error));
};

export const postRegistroAsignadoSlice = (data) => (dispatch) => {
  try {
    axios
      .post("/api/asignacion", {
        codigo: data.codigo,
        descripcion: data.descripcion,
        estado: data.estado,
      })
      .then(async () => {
        await dispatch(fetchAllRegistroAsignadoSlice()).catch((e) =>
          console.log(e)
        );
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
export const putRegistroAsignadoSlice = (data) => (dispatch) => {
  try {
    axios
      .put(`/api/asignacion/${data.id_asignacion}`, {
        codigo: data.codigo,
        descripcion: data.descripcion,
        estado: data.estado,
      })
      .then(async () => {
        await dispatch(fetchAllRegistroAsignadoSlice());
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};
export const deleteRegistroAsignadoSlice = (data) => (dispatch) => {
  try {
    axios
      .delete(`/api/asignacion/${data.id_asignacion}`)
      .then(async () => await dispatch(fetchAllRegistroAsignadoSlice()))
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};

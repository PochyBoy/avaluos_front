import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registroProfesionSlice = createSlice({
  name: "registroRegistroProfesion",
  initialState: {
    allRegistroProfesion: [],
    allDescripcionProfesion: [],
  },
  reducers: {
    setRegistroProfesionAll: (state, action) => {
      state.allRegistroProfesion = action.payload;
    },
    setDescripcionProfesion: (state, action) => {
      state.allDescripcionProfesion = action.payload;
    },
  },
});

export default registroProfesionSlice.reducer;
export const { setRegistroProfesionAll ,setDescripcionProfesion} = registroProfesionSlice.actions;

export const fetchAllRegistroProfesionSlice = () => async (dispatch) => {
  await axios
    .get("/api/profesion")
    .then((res) => {
      dispatch(setRegistroProfesionAll(res.data));
    })
    .catch((error) => console.log(error));
};

export const fetchDescripcionRegistroProfesionSlice =
  () => async (dispatch) => {
    await axios
      .get("/api/profesion")
      .then((res) => {
        let descripcionAll = [];
        res.data.forEach((item) => {
          descripcionAll.push({ descripcion: item.descripcion });
        });
        dispatch(setDescripcionProfesion(descripcionAll));
      })
      .catch((error) => console.log(error));
  };
export const postRegistroProfesionSlice = (data) => (dispatch) => {
  try {
    axios
      .post("/api/profesion", {
        codigo: data.codigo,
        descripcion: data.descripcion,
        estado: data.estado,
      })
      .then(async () => {
        await dispatch(fetchAllRegistroProfesionSlice()).catch((e) =>
          console.log(e)
        );
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
export const putRegistroProfesionSlice = (data) => (dispatch) => {
  try {
    axios
      .put(`/api/profesion/${data.id_profesion}`, {
        codigo: data.codigo,
        descripcion: data.descripcion,
        estado: data.estado,
      })
      .then(async () => {
        await dispatch(fetchAllRegistroProfesionSlice());
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};
export const deleteRegistroProfesionSlice = (data) => (dispatch) => {
  try {
    axios
      .delete(`/api/profesion/${data.id_profesion}`)
      .then(async () => await dispatch(fetchAllRegistroProfesionSlice()))
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import service from "../../../service/Recursos";
export const registroConveniosSlice = createSlice({
  name: "registroConvenios",
  initialState: {
    allRegistroConvenios: [],
    allDescripcionConvenios: [],
  },
  reducers: {
    setRegistroConveniosAll: (state, action) => {
      state.allRegistroConvenios = action.payload;
    },
    setDescripcionConvenios: (state, action) => {
      state.allDescripcionConvenios = action.payload;
    },
  },
});

export default registroConveniosSlice.reducer;
export const { setRegistroConveniosAll, setDescripcionConvenios } =
  registroConveniosSlice.actions;

export const fetchAllRegistroConveniosSlice = () => async (dispatch) => {
  await axios
    .get("/api/convenios")
    .then((res) => {
      dispatch(setRegistroConveniosAll(res.data));
    })
    .catch((error) => console.log(error));
};
export const fetchDescripcionRegistroConveniosSlice =
  () => async (dispatch) => {
    await axios
      .get("/api/convenios")
      .then((res) => {
        let descripcionAll = [];
        res.data.forEach((item) => {
          descripcionAll.push({ nombre_proyecto: item.nombre_proyecto });
        });
        dispatch(setDescripcionConvenios(descripcionAll));
      })
      .catch((error) => console.log(error));
  };
export const postRegistroConveniosSlice = (data) => (dispatch) => {
  try {
    axios
      .post("/api/convenios", {
        municipio: data.municipio,
        perito: data.perito,
        nombre_proyecto: data.nombre_proyecto,
        fecha_inicio: data.fecha_inicio,
        fecha_fin: data.fecha_fin
          ? service.format(data.fecha_fin)
          : data.fecha_fin,
      })
      .then(async () => {
        await dispatch(fetchAllRegistroConveniosSlice()).catch((e) =>
          console.log(e)
        );
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
export const putRegistroConveniosSlice = (data) => async (dispatch) => {
  try {
    return await axios
      .put(`/api/convenios/${data.id}`, {
        municipio: data.municipio,
        perito: data.perito,
        nombre_proyecto: data.nombre_proyecto,
        fecha_inicio: service.format(data.fecha_inicio), // data.fecha_inicio,
        fecha_fin: data.fecha_fin
          ? service.format(data.fecha_fin)
          : data.fecha_fin,
      })
      .then(async () => {
        await dispatch(fetchAllRegistroConveniosSlice());
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};
export const deleteRegistroConveniosSlice = (data) => (dispatch) => {
  try {
    axios
      .delete(`/api/convenios/${data.id}`)
      .then(async () => await dispatch(fetchAllRegistroConveniosSlice()))
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};

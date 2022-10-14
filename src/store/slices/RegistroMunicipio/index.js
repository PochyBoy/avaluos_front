import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registroMunicipioSlice = createSlice({
  name: "registroRegistroMunicipio",
  initialState: {
    allRegistroMunicipio: [],
    allDescripcionMunicipio: [],
  },
  reducers: {
    setRegistroMunicipioAll: (state, action) => {
      state.allRegistroMunicipio = action.payload;
    },
    setDescripcionMunicipio: (state, action) => {
      state.allDescripcionMunicipio = action.payload;
    },
  },
});

export default registroMunicipioSlice.reducer;
export const { setRegistroMunicipioAll, setDescripcionMunicipio } =
  registroMunicipioSlice.actions;

export const fetchAllRegistroMunicipioSlice = () => async (dispatch) => {
  await axios
    .get("/api/municipio")
    .then((res) => {
      dispatch(setRegistroMunicipioAll(res.data));
    })
    .catch((error) => console.log(error));
};
export const fetchDescripcionRegistroMunicipioSlice =
  () => async (dispatch) => {
    await axios
      .get("/api/municipio")
      .then((res) => {
        let descripcionAll = [];
        res.data.forEach((item) => {
          descripcionAll.push({ descripcion: item.descripcion });
        });
        dispatch(setDescripcionMunicipio(descripcionAll));
      })
      .catch((error) => console.log(error));
  };

export const postRegistroMunicipioSlice = (data) => (dispatch) => {
  try {
    axios
      .post("/api/municipio", {
        ...data,
      })
      .then(async () => {
        await dispatch(fetchAllRegistroMunicipioSlice());
        await dispatch(fetchDescripcionRegistroMunicipioSlice());
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
export const putRegistroMunicipioSlice = (data) => (dispatch) => {
  try {
    axios
      .put(`/api/municipio/${data.id_municipio}`, {
        ...data,
      })
      .then(async () => {
        await dispatch(fetchAllRegistroMunicipioSlice());
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};
export const deleteRegistroMunicipioSlice = (data) => (dispatch) => {
  try {
    axios
      .delete(`/api/municipio/${data.id_municipio}`)
      .then(async () => await dispatch(fetchAllRegistroMunicipioSlice()))
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};

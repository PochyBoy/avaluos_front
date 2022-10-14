import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registroBancaSlice = createSlice({
  name: "registroBanca",
  initialState: {
    allRegistroBanca: [],
    allDescripcionBanca: [],
  },
  reducers: {
    setRegistroBancaAll: (state, action) => {
      state.allRegistroBanca = action.payload;
    },
    setDescripcionBanca: (state, action) => {
      state.allDescripcionBanca = action.payload;
    },
  },
});

export default registroBancaSlice.reducer;
export const { setRegistroBancaAll, setDescripcionBanca } =
  registroBancaSlice.actions;

export const fetchAllRegistroBancaSlice = () => async (dispatch) => {
  await axios
    .get("/api/banca")
    .then((res) => {
      dispatch(setRegistroBancaAll(res.data));
    })
    .catch((error) => console.log(error));
};

export const fetchDescripcionRegistroBancaSlice = () => async (dispatch) => {
  await axios
    .get("/api/banca")
    .then((res) => {
      let descripcionAll = [];
      res.data.forEach((item) => {
        descripcionAll.push({ descripcion: item.descripcion });
      });
      dispatch(setDescripcionBanca(descripcionAll));
    })
    .catch((error) => console.log(error));
};

export const postRegistroBancaSlice = (data) => (dispatch) => {
  try {
    axios
      .post("/api/banca", {
        codigo: data.codigo,
        descripcion: data.descripcion,
        estado: data.estado,
      })
      .then(async () => {
        await dispatch(fetchAllRegistroBancaSlice()).catch((e) =>
          console.log(e)
        );
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
export const putRegistroBancaSlice = (data) => (dispatch) => {
  try {
    axios
      .put(`/api/banca/${data.id_banca}`, {
        codigo: data.codigo,
        descripcion: data.descripcion,
        estado: data.estado,
      })
      .then(async () => {
        await dispatch(fetchAllRegistroBancaSlice());
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};
export const deleteRegistroBancaSlice = (data) => (dispatch) => {
  try {
    axios
      .delete(`/api/banca/${data.id_banca}`)
      .then(async () => await dispatch(fetchAllRegistroBancaSlice()))
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};

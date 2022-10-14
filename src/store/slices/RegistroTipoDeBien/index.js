import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registroTipoDeBienSlice = createSlice({
  name: "registroRegistroTipoDeBien",
  initialState: {
    allRegistroTipoDeBien: [],
  },
  reducers: {
    setRegistroTipoDeBienAll: (state, action) => {
      state.allRegistroTipoDeBien = action.payload;
    },
  },
});

export default registroTipoDeBienSlice.reducer;
export const { setRegistroTipoDeBienAll } = registroTipoDeBienSlice.actions;

export const fetchAllRegistroTipoDeBienSlice = () => async (dispatch) => {
  await axios
    .get("/api/tipodebien")
    .then((res) => {
      dispatch(setRegistroTipoDeBienAll(res.data));
    })
    .catch((error) => console.log(error));
};

export const postRegistroTipoDeBienSlice = (data) => (dispatch) => {
  try {
    axios
      .post("/api/tipodebien", {
        codigo: data.codigo,
        descripcion: data.descripcion,
        estado: data.estado,
      })
      .then(async () => {
        await dispatch(fetchAllRegistroTipoDeBienSlice()).catch((e) =>
          console.log(e)
        );
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
export const putRegistroTipoDeBienSlice = (data) => (dispatch) => {
  try {
    axios
      .put(`/api/tipodebien/${data.id_tipodebien}`, {
        codigo: data.codigo,
        descripcion: data.descripcion,
        estado: data.estado,
      })
      .then(async () => {
        await dispatch(fetchAllRegistroTipoDeBienSlice());
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};
export const deleteRegistroTipoDeBienSlice = (data) => (dispatch) => {
  try {
    axios
      .delete(`/api/tipodebien/${data.id_tipodebien}`)
      .then(async () => await dispatch(fetchAllRegistroTipoDeBienSlice()))
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};

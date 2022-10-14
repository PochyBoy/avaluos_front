import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registroTipoDePersonaSlice = createSlice({
  name: "registroTipoDePersona",
  initialState: {
    allRegistroTipoDePersona: [],
    allDescripcionTipoDePersona: [],
  },
  reducers: {
    setRegistroTipoDePersonaAll: (state, action) => {
      state.allRegistroTipoDePersona = action.payload;
    },
    setDescripcionTipoDePersona: (state, action) => {
      state.allDescripcionTipoDePersona = action.payload;
    },
  },
});

export default registroTipoDePersonaSlice.reducer;
export const { setRegistroTipoDePersonaAll, setDescripcionTipoDePersona } =
  registroTipoDePersonaSlice.actions;

export const fetchAllRegistroTipoDePersonaSlice = () => async (dispatch) => {
  await axios
    .get("/api/tipodepersona")
    .then((res) => {
      dispatch(setRegistroTipoDePersonaAll(res.data));
     
    })
    .catch((error) => console.log(error));
};

export const fetchDescripcionRegistroTipoDePersonaSlice =
  () => async (dispatch) => {
    await axios
      .get("/api/tipodepersona")
      .then((res) => {
        let descripcionAll = [];
        res.data.forEach((item) => {
          descripcionAll.push({ descripcion: item.descripcion });
        });
        dispatch(setDescripcionTipoDePersona(descripcionAll));
      })
      .catch((error) => console.log(error));
  };

export const postRegistroTipoDePersonaSlice = (data) => (dispatch) => {
  try {
    axios
      .post("/api/tipodepersona", { ...data })
      .then(async () => {
        await dispatch(fetchAllRegistroTipoDePersonaSlice()).catch((e) =>
          console.log(e)
        );
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
export const putRegistroTipoDePersonaSlice = (data) => (dispatch) => {
  try {
    axios
      .put(`/api/tipodepersona/${data.id_tipodepersona}`, {
        ...data,
      })
      .then(async () => {
        await dispatch(fetchAllRegistroTipoDePersonaSlice());
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};
export const deleteRegistroTipoDePersonaSlice = (data) => (dispatch) => {
  try {
    axios
      .delete(`/api/tipodepersona/${data.id_tipodepersona}`)
      .then(async () => await dispatch(fetchAllRegistroTipoDePersonaSlice()))
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};

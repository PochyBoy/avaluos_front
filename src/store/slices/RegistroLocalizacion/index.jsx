import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registroLocalizacionSlice = createSlice({
  name: "registroLocalizacion",
  initialState: {
    allRegistroLocalizacion: [],
    allNumeroDesolicitudLocalizacion: [],
    numerodesolicitudLocalizcion: {},
  },
  reducers: {
    setRegistroLocalizacionAll: (state, action) => {
      state.allRegistroLocalizacion = action.payload;
    },
    setDescripcionLocalizacion: (state, action) => {
      state.allNumeroDesolicitudLocalizacion = action.payload;
    },
    setNumerodesolicitud: (state, action) => {
      state.numerodesolicitudLocalizcion = action.payload;
    },
  },
});

export default registroLocalizacionSlice.reducer;
export const {
  setRegistroLocalizacionAll,
  setDescripcionLocalizacion,
  setNumerodesolicitud,
} = registroLocalizacionSlice.actions;

export const fetchAllRegistroLocalizacionSlice = () => async (dispatch) => {
  await axios
    .get("/api/ubicaciondesolicitud")
    .then((res) => {
      dispatch(setRegistroLocalizacionAll(res.data));
    })
    .catch((error) => console.log(error));
};
export const fetchDescripcionRegistroLocalizacionSlice =
  () => async (dispatch) => {
    await axios
      .get("/api/ubicaciondesolicitudv2")
      .then((res) => {
        dispatch(setDescripcionLocalizacion(res.data));
      })
      .catch((error) => console.log(error));
  };
export const fetchNumeroSolicitudUbicacion = (data) => async (dispatch) => {
  return await axios
    .get(`/api/ubicaciondesolicitudv2/${data.numerodesolicitante}`)
    .then((res) => {
      dispatch(setNumerodesolicitud(res.data));
    })
    .catch((error) => console.log(error));
};
export const postRegistroLocalizacionSlice = (data) => (dispatch) => {
  try {
    axios
      .post("/api/ubicaciondesolicitud", {
        ...data,
      })
      .then(async () => {
        await dispatch(fetchAllRegistroLocalizacionSlice());
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
export const postNumeroSolicitudLocalizacion = (data) => (dispatch) => {
  try {
    axios
      .post("/api/ubicaciondesolicitudv2", {
        ...data,
      })
      .then(async () => {
        await dispatch(fetchDescripcionRegistroLocalizacionSlice());
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
export const putRegistroLocalizacionSlice = (data) => (dispatch) => {
  try {
    axios
      .put(`/api/ubicaciondesolicitudv2/${data.id_ubicaciondesolicitud}`, {
        ...data,
      })
      .then(async () => {
        await dispatch(fetchAllRegistroLocalizacionSlice());
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};
export const putNumeroSolicitudLocalizacion = (data) => (dispatch) => {
  try {
    axios
      .put(`/api/ubicaciondesolicitudv2/${data.numerodesolicitante}`, {
        responsable: data.responsable,
        nombre: data.nombre,
        email: data.email,
        direccion: data.direccion,
        coordenadasX: data.coordenadasX,
        coordenadasY: data.coordenadasY,
        puntoX: data.puntoX,
        puntoY: data.puntoY,
        validar: data.validar,
      })
      .then(async () => {
        await dispatch(fetchDescripcionRegistroLocalizacionSlice());
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};
export const deleteRegistroLocalizacionSlice = (data) => (dispatch) => {
  try {
    axios
      .delete(`/api/ubicaciondesolicitud/${data.id_ubicaciondesolicitud}`)
      .then(async () => await dispatch(fetchAllRegistroLocalizacionSlice()))
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};

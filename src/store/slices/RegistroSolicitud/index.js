import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import service from "./../../../service/Recursos";
export const registroSolicitudSlice = createSlice({
  name: "registroSolicitud",
  initialState: {
    allRegistroSolicitud: [],
  },
  reducers: {
    setRegistroSolicitudAll: (state, action) => {
      state.allRegistroSolicitud = action.payload;
    },
  },
});
export default registroSolicitudSlice.reducer;
export const { setRegistroSolicitudAll } = registroSolicitudSlice.actions;

export const fetchAllRegistroSolicitudSlice = () => async (dispatch) => {
  await axios
    .get("/api/solicitud")
    .then((res) => {
      dispatch(setRegistroSolicitudAll(res.data));
    })
    .catch((error) => console.log(error));
};
export const postRegistroSolicitudSlice = (data) => (dispatch) => {
  try {
    axios
      .post("/api/solicitud", {
        ...data,
        fecha_solicitud: service.format(data.fecha_solicitud),
        // hora_solicitud: service.hora(data.hora_solicitud),
      })
      .then(async () => {
        await dispatch(fetchAllRegistroSolicitudSlice()).catch((e) =>
          console.log(e)
        );
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
export const putRegistroSolicitudSlice = (data) => (dispatch) => {
  try {
    axios
      .put(`/api/solicitud/${data.id_solicitud}`, {
        ...data,
        fecha_solicitud: service.format(data.fecha_solicitud),
      })
      .then(async () => {
        await dispatch(fetchAllRegistroSolicitudSlice());
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};
export const putValidacionSolicitudSlice = (data) => async (dispatch) => {
  try {
    return await axios
      .put(`/api/solicitudput/${data.id_solicitud}`, {
        validacion: data.validacion,
      })
      .then(async () => {
        await dispatch(fetchAllRegistroSolicitudSlice());
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};
export const deleteRegistroSolicitudSlice = (data) => (dispatch) => {
  try {
    axios
      .delete(`/api/solicitud/${data.id_solicitud}`)
      .then(async () => await dispatch(fetchAllRegistroSolicitudSlice()))
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};

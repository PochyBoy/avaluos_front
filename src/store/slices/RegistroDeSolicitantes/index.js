import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import service from "./../../../service/Recursos";
export const registroDeSolicitantesSlice = createSlice({
  name: "registroRegistroDeSolicitantes",
  initialState: {
    allRegistroDeSolicitantes: [],
  },
  reducers: {
    setRegistroDeSolicitantesAll: (state, action) => {
      state.allRegistroDeSolicitantes = action.payload;
    },
  },
});

export default registroDeSolicitantesSlice.reducer;
export const { setRegistroDeSolicitantesAll } =
  registroDeSolicitantesSlice.actions;

export const fetchAllRegistroDeSolicitantesSlice = () => async (dispatch) => {
  await axios
    .get("/api/solicitante")
    .then((res) => {
      dispatch(setRegistroDeSolicitantesAll(res.data));
    })
    .catch((error) => console.log(error));
};

export const postRegistroDeSolicitantesSlice = (data) => (dispatch) => {
  try {
    axios
      .post("/api/solicitante", {
        ...data,
        fecha_inicio: service.format(data.fecha_inicio),
        fecha_fin: service.format(data.fecha_fin),
      })
      .then(async () => {
        await dispatch(fetchAllRegistroDeSolicitantesSlice()).catch((e) =>
          console.log(e)
        );
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
export const putRegistroDeSolicitantesSlice = (data) => (dispatch) => {
  try {
    axios
      .put(`/api/solicitante/${data.id_solicitante}`, {
        ...data,
        fecha_inicio: service.format(data.fecha_inicio),
        fecha_fin: service.format(data.fecha_fin),
      })
      .then(async () => {
        await dispatch(fetchAllRegistroDeSolicitantesSlice());
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};
export const deleteRegistroDeSolicitantesSlice = (data) => (dispatch) => {
  try {
    axios
      .delete(`/api/solicitante/${data.id_solicitante}`)
      .then(async () => await dispatch(fetchAllRegistroDeSolicitantesSlice()))
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import service from "./../../../service/Recursos";
export const registroValoracionSlice = createSlice({
  name: "registroValoracion",
  initialState: {
    allRegistroValoracion: [],
    allRegistroValoracionCliente: [],
  },
  reducers: {
    setRegistroValoracionAll: (state, action) => {
      state.allRegistroValoracion = action.payload;
    },
    setRegistroValoracionClienteAll: (state, action) => {
      state.allRegistroValoracionCliente = action.payload;
    },
  },
});

export default registroValoracionSlice.reducer;
export const { setRegistroValoracionAll, setRegistroValoracionClienteAll } =
  registroValoracionSlice.actions;

export const fetchAllRegistroValoracionSlice = () => async (dispatch) => {
  await axios
    .get("/api/valoracion")
    .then((res) => {
      dispatch(setRegistroValoracionAll(res.data));
    })
    .catch((error) => console.log(error));
};

export const fetchAllRegistroValoracionClienteSlice =
  (data) => async (dispatch) => {
    if (!data) {
      return;
    }
    if (data) {
      return await axios
        .get(`/api/valoracionemail/${data}`)
        .then((res) => {
          dispatch(setRegistroValoracionClienteAll(res.data));
        })
        .catch((error) => console.log(error));
    }
  };

export const postRegistroValoracionSlice = (data) => (dispatch) => {
  try {
    axios
      .post("/api/valoracion", {
        ...data,
        fecha_pago: service.format(data.fecha_pago),
        fecha_visita: service.format(data.fecha_visita),
      })
      .then(async () => {
        await dispatch(fetchAllRegistroValoracionSlice()).catch((e) =>
          console.log(e)
        );
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
export const putRegistroValoracionSlice = (data) => (dispatch) => {
  try {
    axios
      .put(`/api/valoracion/${data.id_valoracion}`, {
        ...data,
        fecha_pago: service.format(data.fecha_pago),
        fecha_visita: service.format(data.fecha_visita),
      })
      .then(async () => {
        await dispatch(fetchAllRegistroValoracionSlice());
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};
export const deleteRegistroValoracionSlice = (data) => (dispatch) => {
  try {
    axios
      .delete(`/api/valoracion/${data.id_valoracion}`)
      .then(async () => await dispatch(fetchAllRegistroValoracionSlice()))
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};

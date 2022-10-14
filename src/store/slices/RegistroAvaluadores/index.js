import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import service from "./../../../service/Recursos";
export const registroAvaluadoresSlice = createSlice({
  name: "registroAvaluadores",
  initialState: {
    allRegistroAvaluadores: [],
    allAvaluadoresSinFechaFin: [],
  },
  reducers: {
    setRegistroAvaluadoresAll: (state, action) => {
      state.allRegistroAvaluadores = action.payload;
    },
    setAllAvaluadoresSinFechaFIn: (state, action) => {
      state.allAvaluadoresSinFechaFin = action.payload;
    },
  },
});

export default registroAvaluadoresSlice.reducer;
export const { setRegistroAvaluadoresAll, setAllAvaluadoresSinFechaFIn } =
  registroAvaluadoresSlice.actions;

export const fetchAllRegistroAvaluadoresSlice = () => async (dispatch) => {
  return await axios
    .get("/api/avaluador")
    .then((res) => {
      dispatch(setRegistroAvaluadoresAll(res.data));
    })
    .catch((error) => console.log(error));
};
export const fetchAllAvaluadoresSinFechaFin = () => async (dispatch) => {
  return await axios
    .get("/api/avaluadorfiltro")
    .then((res) => {
      let avaluadorAll = [];
      res.data.forEach((item) => {
        avaluadorAll.push({ nombre: item.nombre });
      });
      dispatch(setAllAvaluadoresSinFechaFIn(avaluadorAll));
    })
    .catch((error) => console.log(error));
};
export const postRegistroAvaluadoresSlice = (data) => async (dispatch) => {
  try {
    return await axios
      .post("/api/avaluador", {
        ...data,
        fecha_inicio: service.format(data.fecha_inicio),
        fecha_fin: data.fecha_fin ? service.format(data.fecha_fin) : null,
        codigo: "prueba",
      })
      .then(async () => {
        await dispatch(fetchAllRegistroAvaluadoresSlice()).catch((e) =>
          console.log(e)
        );
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
export const putRegistroAvaluadoresSlice = (data) => async (dispatch) => {
  console.log(service.format(data.fecha_inicio));
  try {
    return await axios
      .put(`/api/avaluador/${data.id_avaluador}`, {
        ...data,

        fecha_inicio: service.format(data.fecha_inicio),
        fecha_fin: data.fecha_fin ? service.format(data.fecha_fin) : null,
      })
      .then(async () => {
        await dispatch(fetchAllRegistroAvaluadoresSlice());
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};
export const deleteRegistroAvaluadoresSlice = (data) => (dispatch) => {
  try {
    axios
      .delete(`/api/avaluador/${data.id_avaluador}`)
      .then(async () => await dispatch(fetchAllRegistroAvaluadoresSlice()))
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};

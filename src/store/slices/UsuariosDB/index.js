import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const usuariosSlice = createSlice({
  name: "usuariosDB",
  initialState: {
    allUsuarios: [],
  },
  reducers: {
    setUsuariosAll: (state, action) => {
      state.allUsuarios = action.payload;
    },
  },
});

export default usuariosSlice.reducer;
export const { setUsuariosAll } = usuariosSlice.actions;

export const fetchAllRegistroUsuariosSlice = () => async (dispatch) => {
  await axios
    .get("/api/usuario")
    .then((res) => {
      dispatch(setUsuariosAll(res.data));
    })
    .catch((error) => console.log(error));
};
export const postRegistroUsuariosSlice = (data) => (dispatch) => {
  try {
    axios
      .post("/api/usuario", {
        ...data,
      })
      .then(async () => {
        await dispatch(fetchAllRegistroUsuariosSlice()).catch((e) =>
          console.log(e)
        );
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
export const putRegistroUsuariosSlice = (data) => (dispatch) => {
  try {
    axios
      .put(`/api/usuario/${data.id_usuario}`, {
        ...data,
      })
      .then(async () => {
        await dispatch(fetchAllRegistroUsuariosSlice()).catch((e) =>
          console.log(e)
        );
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};
export const deleteRegistroUsuariosSlice = (data) => (dispatch) => {
  try {
    axios
      .delete(`/api/usuario/${data.id_usuario}`)
      .then(async () => await dispatch(fetchAllRegistroUsuariosSlice()))
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registroBienSlice = createSlice({
  name: "registroBien",
  initialState: {
    allRegistroBien: [],
    allDescripcionBien: [],
  },
  reducers: {
    setRegistroBienAll: (state, action) => {
      state.allRegistroBien = action.payload;
    },
    setDescripcionBien: (state, action) => {
      state.allDescripcionBien = action.payload;
    },
  },
});

export default registroBienSlice.reducer;
export const { setRegistroBienAll, setDescripcionBien } =
  registroBienSlice.actions;

export const fetchAllRegistroBienSlice = () => async (dispatch) => {
  await axios
    .get("/api/bien")
    .then((res) => {
      dispatch(setRegistroBienAll(res.data));
    })
    .catch((error) => console.log(error));
};

export const fetchDescripcionRegistroBienSlice =
  () => async (dispatch) => {
    await axios
      .get("/api/bien")
      .then((res) => {
        let descripcionAll = [];
        res.data.forEach((item) => {
          descripcionAll.push({ descripcion: item.descripcion });
        });
        dispatch(setDescripcionBien(descripcionAll));
      })
      .catch((error) => console.log(error));
  };

export const postRegistroBienSlice = (data) => (dispatch) => {
  try {
    axios
      .post("/api/bien", { ...data })
      .then(async () => {
        await dispatch(fetchAllRegistroBienSlice()).catch((e) =>
          console.log(e)
        );
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
};
export const putRegistroBienSlice = (data) => (dispatch) => {
  try {
    axios
      .put(`/api/bien/${data.id_bien}`, { ...data })
      .then(async () => {
        await dispatch(fetchAllRegistroBienSlice());
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};
export const deleteRegistroBienSlice = (data) => (dispatch) => {
  try {
    axios
      .delete(`/api/bien/${data.id_bien}`)
      .then(async () => await dispatch(fetchAllRegistroBienSlice()))
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};

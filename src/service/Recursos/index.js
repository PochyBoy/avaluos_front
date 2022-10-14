const updateSelectSearch = (datoIngresado) => {
  let datoFinal = null;
  if (datoIngresado) {
    let arrNew = datoIngresado.split(",");
    datoFinal = {
      code: arrNew[0],
      name: arrNew[1],
    };
  }
  return datoFinal;
};
const updateMultiSelect = (datoIngresado, atributoIngresado) => {
  let datoFinal = [];
  if (datoIngresado) {
    if (!datoIngresado.includes(",")) {
      datoFinal.push({
        [atributoIngresado]: datoIngresado,
      });
    } else {
      let newDato = datoIngresado.split(",");
      newDato.forEach((item) => {
        datoFinal.push({
          [atributoIngresado]: item,
        });
      });
    }
  }
  return datoFinal;
};
const postMultiSelect = (datoIngresado, atributoIngresado) => {
  let arrNew = [...datoIngresado];
  let newData = [];
  arrNew.forEach((item) => {
    newData.push(item[atributoIngresado]);
  });
  return newData.toString();
};

const fecha = (DataFecha, booleanoData) => {
  if (DataFecha === null) {
    return null;
  }
  if (booleanoData) {
    let fecha = new Date(DataFecha);
    fecha = fecha.setDate(fecha.getDate() + 1);
    fecha = new Date(fecha);
    return fecha;
  } else {
    let fecha = new Date(DataFecha);
    fecha = fecha.setDate(fecha.getDate() + 1);
    fecha = new Date(fecha);
    let getDate = fecha.getDate();
    let getMonth = fecha.getMonth() + 1;
    let getFullYear = fecha.getFullYear();
    return getDate + "-" + getMonth + "-" + getFullYear;
  }
};

function format(inputDate) {
  let date, month, year;

  // date = inputDate.getDate();
  // month = inputDate.getMonth() + 1;
  // year = inputDate.getFullYear();
  date = new Date(inputDate).getDate();
  month = new Date(inputDate).getMonth() + 1;
  year = new Date(inputDate).getFullYear();

  date = date.toString().padStart(2, "0");

  month = month.toString().padStart(2, "0");

  return `${year}/${month}/${date}`;
}
const hora = (dataHora) => {
  return new Date(dataHora).getHours() + ":" + new Date(dataHora).getMinutes();
};
export default {
  updateSelectSearch,
  updateMultiSelect,
  postMultiSelect,
  fecha,
  format,
  hora,
};

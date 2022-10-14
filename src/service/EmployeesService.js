import axios from "axios";

export class EmployeesService {
  getEmployeesAll() {
    return axios
      .get("assets/demo/data/registroAvaluadores.json")
      .then((res) => res.data.data);
  }
  getMunicipioService() {
    return axios
      .get("assets/demo/data/municipio.json")
      .then((res) => res.data.data);
  }
  getConvenioService() {
    return axios
      .get("assets/demo/data/convenio.json")
      .then((res) => res.data.data);
  }
}

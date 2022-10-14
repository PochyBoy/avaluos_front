import axios from "axios";

export class RegistroDeSolicitantesService {
  getRegistroDeSolicitantesService() {
    return axios
      .get("assets/demo/data/RegistroDeSolicitantes.json")
      .then((res) => res.data.data);
  }
  getMunicipioService() {
    return axios
      .get("assets/demo/data/municipio.json")
      .then((res) => res.data.data);
  }
}

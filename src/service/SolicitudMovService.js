import axios from "axios";

export class SolicitudMovService {
  getSolicitudMovService() {
    return axios
      .get("assets/demo/data/SolicitudMov.json")
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

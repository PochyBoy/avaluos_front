import axios from "axios";

export class ConvenioService {
  getConvenio() {
    return axios
      .get("assets/demo/data/convenio.json")
      .then((res) => res.data.data);
  }
  getMunicipioService() {
    return axios
      .get("assets/demo/data/municipio.json")
      .then((res) => res.data.data);
  }
}

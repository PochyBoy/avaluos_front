import axios from "axios";

export class MunicipioService {
  getMunicipioService() {
    return axios
      .get("assets/demo/data/municipio.json")
      .then((res) => res.data.data);
  }
}

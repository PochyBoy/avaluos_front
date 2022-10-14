import axios from "axios";

export class BancaService {
  getBanca() {
    return axios
      .get("assets/demo/data/banca.json")
      .then((res) => res.data.data);
  }
}

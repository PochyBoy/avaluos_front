import axios from 'axios';

export class RegistroAsignadoService {

    getRegistroAsignadoService() {
        return axios.get('assets/demo/data/banca.json').then(res => res.data.data);
    }

}
import axios from 'axios';

export class SLAService {

    getBanca() {
        return axios.get('assets/demo/data/SLA.json').then(res => res.data.data);
    }

}
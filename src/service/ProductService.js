import axios from 'axios';

export class ProductService {

    getProductsSmall() {
        return axios.get('assets/demo/data/products.json').then(res => res.data.data);
    }

    getProducts() {
        return axios.get('assets/demo/data/products.json').then(res => res.data.data);
    }

    // getProductsWithOrdersSmall() {
    //     return axios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    // }
    getProductsWithOrdersSmall() {
        return axios.get('assets/demo/data/employees-documents.json').then(res => res.data.data);
    }

    getEmployeeDocumentSmall() {
        return axios.get('assets/demo/data/employee-documents.json').then(res => res.data.data);
    }


    getEmployees() {
        return axios.get('assets/demo/data/employees.json').then(res => res.data.data);
    }

    getUsers() {
        return axios.get('assets/demo/data/users.json').then(res => res.data.data);
    }
}
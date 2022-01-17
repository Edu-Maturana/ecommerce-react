import axios from "axios"

import environment from "../config";

export const getBrands = () => {
    return axios.get(`${environment.apiUrl}brands`)
}
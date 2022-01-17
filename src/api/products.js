import axios from "axios"

import environment from "../../config"

export const getProducts = () => {
    return axios.get(`${environment.apiUrl}products`)
}


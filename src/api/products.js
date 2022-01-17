import axios from "axios"

import environment from "../config"

export const getProducts = async () => {
    return axios.get(`${environment.apiUrl}products`)
}


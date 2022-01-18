import axios from "axios"

import environment from "../config"

export const getProducts = async (limit = 5, brand = "") => {
    if (brand !== "") {
        return await axios.get(`${environment.apiUrl}products?limit=${limit}&brand=${brand}`)
    }
    return await axios.get(`${environment.apiUrl}products?limit=${limit}`)
}


export const getProduct = async (id) => {
    return axios.get(`${environment.apiUrl}products/${id}`)
}


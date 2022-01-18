import axios from "axios"

import environment from "../config"

export const getProducts = async (limit = 6) => {
    return axios.get(`${environment.apiUrl}products?limit=${limit}`)
}

export const getProduct = async (id) => {
    return axios.get(`${environment.apiUrl}products/${id}`)
}


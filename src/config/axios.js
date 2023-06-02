import axios from "axios";


export const clienteAxios = axios.create({
    baseURL: 'https://api-brushop.onrender.com'
})
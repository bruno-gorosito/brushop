import axios from "axios";
import { useEffect } from "react";




export const clienteAxios = axios.create({
    baseURL: 'https://api-brushop.onrender.com',
    headers: {
    }
})
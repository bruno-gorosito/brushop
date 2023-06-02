'use client'
import { CARGAR_CATEGORIAS, CARGAR_PRODUCTOS } from "@/app/types";
import productoReducer from "./productoReducer";
import { clienteAxios } from "@/config/axios";

const { createContext, useReducer } = require("react");


export const productoContext = createContext();


export const ProductoProvider = ({children}) => {


    const initialState = {
        productos: [],
        categorias: []
    }

    const [state, dispatch] = useReducer(productoReducer, initialState);

    const cargarProductos = async() => {
        const resul = await clienteAxios.get('/api/productos?populate=*');
        dispatch({
            type: CARGAR_PRODUCTOS,
            payload: resul.data.data
        })
    }

    const cargarCategorias = async() => {
        const resul = await clienteAxios.get('/api/categorias');
        console.log(resul.data.data)
        dispatch({
            type: CARGAR_CATEGORIAS,
            payload: resul.data.data
        })
    }

    return(
        <productoContext.Provider
            value={{
                productos: state.productos,
                categorias: state.categorias,
                cargarProductos,
                cargarCategorias
            }}
        >
            
            {children}
        </productoContext.Provider>
    )
}
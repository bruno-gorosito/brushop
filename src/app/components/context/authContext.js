'use client'

import { createContext, useReducer } from "react";
import authReducer from "./authReducer";
import { CERRAR_SESION, INICIAR_SESION, REGISTRARSE, VALIDAR_SESION, VALIDAR_SESION_EXITO } from "@/app/types";
import { clienteAxios } from "@/config/axios";
import { useRouter } from "next/navigation";

export const authContext = createContext();

export const AuthProvider = ({children}) => {
    const router = useRouter()

    const initialState = {
        session: sessionStorage.getItem(process.env.AUTH_JWT) || null,
        usuario: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const iniciarSesion = async({username, password}) => {
        const resul = await clienteAxios.post('/api/auth/local', {identifier: username, password: password});
        sessionStorage.setItem(process.env.AUTH_JWT, resul.data.jwt);
        router.push('/')
        dispatch({
            type: INICIAR_SESION,
            payload: resul.data.user
        })
    }

    const cerrarSesion = () => {
        sessionStorage.removeItem(process.env.AUTH_JWT);
        router.push('/')
        dispatch({
            type: CERRAR_SESION
        })
    }

    const registrarme = async(usuario) => {
        const resul = await clienteAxios.post('/api/auth/local/register',usuario);
        console.log(resul)
        sessionStorage.setItem(process.env.AUTH_JWT, resul.data.jwt);
        router.push('/')
        dispatch({
            type: REGISTRARSE,
            payload: resul.data.user
        })
    }


    const validarSesion = () => {
        dispatch({
            type: VALIDAR_SESION
        })
    }

    return (
        <authContext.Provider 
            value={{
                session: state.session,
                usuario: state.usuario,
                validarSesion,
                iniciarSesion, 
                cerrarSesion,
                registrarme
            }}
        >
            {children}
        </authContext.Provider>
    )
}
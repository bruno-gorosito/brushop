'use client'

import { createContext, useEffect, useReducer } from "react";
import authReducer from "./authReducer";
import { CERRAR_SESION, INICIAR_SESION, REGISTRARSE, VALIDAR_SESION, VALIDAR_SESION_ERROR, VALIDAR_SESION_EXITO } from "@/app/types";
import { clienteAxios } from "@/config/axios";
import { useRouter } from "next/navigation";

export const authContext = createContext();

export const AuthProvider = ({children}) => {
    const router = useRouter()

    const initialState = {
        session: null,
        usuario: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const iniciarSesion = async({username, password}) => {
        try {
            const resul = await clienteAxios.post('/api/auth/local', {identifier: username, password: password});
            sessionStorage.setItem(process.env.AUTH_JWT, resul.data.jwt);
            router.push('/')
            dispatch({
                type: INICIAR_SESION,
                payload: resul.data.user
            })
        } catch (error) {
          console.log(error)  
        }
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


    const validarSesion = async() => {
        try {
            state.session = sessionStorage.getItem(process.env.AUTH_JWT)
            if (state.session !== null) {
                const resul = await clienteAxios.get('/api/users/me', {
                    headers: {
                        'Authorization': 'Bearer ' + state.session
                    }
                })
                state.session ? router.push('/') : null
                dispatch({
                    type: VALIDAR_SESION_EXITO,
                    payload:  resul.data
                })
            } else {
                dispatch({
                    type: VALIDAR_SESION_ERROR
                })
            }
        } catch (error) {
            console.log(error)
        }
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
'use client'

import { createContext, useEffect, useReducer } from "react";
import authReducer from "./authReducer";
import { CERRAR_SESION, INICIAR_SESION, INICIAR_SESION_ERROR, REGISTRARSE, REGISTRARSE_ERROR, REINICIAR_ERROR, VALIDAR_SESION, VALIDAR_SESION_ERROR, VALIDAR_SESION_EXITO } from "@/app/types";
import { clienteAxios } from "@/config/axios";
import { useRouter } from "next/navigation";

export const authContext = createContext();

export const AuthProvider = ({children}) => {
    const router = useRouter()

    const initialState = {
        session: null,
        usuario: null,
        error: ''
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const iniciarSesion = async({identifier, password}) => {
        try {
            const resul = await clienteAxios.post('/api/auth/local', {identifier: identifier, password: password});
            sessionStorage.setItem(process.env.AUTH_JWT, resul.data.jwt);
            router.push('/')
            dispatch({
                type: INICIAR_SESION,
                payload: resul.data.user
            })
        } catch (error) {
            dispatch({
                type: INICIAR_SESION_ERROR,
                payload: error.response.data.error.message
            })

            setTimeout(() => {
                dispatch({
                    type: REINICIAR_ERROR
                })
            }, 3000)
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
        try {
            const resul = await clienteAxios.post('/api/auth/local/register', usuario);
            sessionStorage.setItem(process.env.AUTH_JWT, resul.data.jwt);
            router.push('/')
            dispatch({
                type: REGISTRARSE,
                payload: resul.data.user
            })
        } catch (error) {
            dispatch({
                type: REGISTRARSE_ERROR,
                payload: error.response.data.error.message
            })

            setTimeout(() => {
                dispatch({
                    type: REINICIAR_ERROR
                })
            }, 3000)
        }
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
                router.push('/')
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
                error: state.error,
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
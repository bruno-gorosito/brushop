import { CERRAR_SESION, INICIAR_SESION, INICIAR_SESION_ERROR, REGISTRARSE, REGISTRARSE_ERROR, REINICIAR_ERROR, VALIDAR_SESION, VALIDAR_SESION_ERROR, VALIDAR_SESION_EXITO } from "@/app/types";



export default function (state, action) {
    switch(action.type) {
        case REGISTRARSE:
        case INICIAR_SESION:
            return {
                ...state,
                session: sessionStorage.getItem(process.env.AUTH_JWT),
                usuario: action.payload
            }
        case VALIDAR_SESION_ERROR:
        case CERRAR_SESION:
            return{
                ...state,
                session: null,
                usuario: null
            }
        case REGISTRARSE_ERROR:
        case INICIAR_SESION_ERROR:
            return{
                ...state,
                error: action.payload
            }
        case REINICIAR_ERROR:
            return {
                ...state,
                error: ''
            }
        // case VALIDAR_SESION:
        //     return {
        //         ...state,
        //         session: sessionStorage.getItem(process.env.AUTH_JWT)
        //     }
        case VALIDAR_SESION_EXITO:
            return {
                ...state,
                usuario: action.payload
            }
        default:
            return state;
    }
}
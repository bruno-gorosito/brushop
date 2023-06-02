import { CERRAR_SESION, INICIAR_SESION, REGISTRARSE, VALIDAR_SESION } from "@/app/types";



export default function (state, action) {
    switch(action.type) {
        case REGISTRARSE:
        case INICIAR_SESION:
            return {
                ...state,
                session: sessionStorage.getItem(process.env.AUTH_JWT),
                usuario: action.payload
            }
        case CERRAR_SESION:
            return{
                ...state,
                session: null,
                usuario: null
            }
        case VALIDAR_SESION:
            return {
                ...state
            }
        default:
            return state;
    }
}
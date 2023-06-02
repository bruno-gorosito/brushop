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
            break;
        case CERRAR_SESION:
            return{
                ...state,
                session: null,
                usuario: null
            }
            break;
        default:
            return state;
    }
}
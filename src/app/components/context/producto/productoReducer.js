'use client'

import { CARGAR_CATEGORIAS, CARGAR_PRODUCTOS } from "@/app/types"

export default function (state, action){
    switch(action.type) {
        case CARGAR_CATEGORIAS:
            return {
                ...state,
                categorias: action.payload
            }
        case CARGAR_PRODUCTOS:
            return{
                ...state,
                productos: action.payload
            }
        default: 
            return state
    }
}
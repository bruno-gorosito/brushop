'use client'

import { clienteAxios } from "@/config/axios"
import { CldImage } from "next-cloudinary"
import Image from "next/image"
import { useEffect, useState } from "react"



export const CardProducto = ({producto}) => {

    return(
        <>
            <div className="w-1/2 md:w-1/4 lg:w-1/6 overflow-hidden rounded-sm odd:border-r-4 even:border-r-4 border-transparent my-2">
               <div className="border border-gray-700 rounded-lg overflow-hidden">
                    <CldImage
                        src={producto.attributes.img.data[0].attributes.formats.small ? producto.attributes.img.data[0].attributes.formats.small.url : producto.attributes.img.data[0].attributes.formats.thumbnail.url}
                        width={600}
                        height={600}
                        alt={producto.attributes.nombre}
                        className="aspect-square h-full object-cover overflow-hidden bg-white"
                    /> 
                    <div className="px-2">
                        <h3 className="text-ellipsis overflow-hidden whitespace-nowrap capitalize mt-2 mb-4">{producto.attributes.nombre}</h3>
                        <p>${producto.attributes.precio.toFixed(2)}</p>  
                        <button
                            className="bg-cyan-600 py-2 w-full rounded-lg my-2 hover:bg-cyan-800 text-white"
                        >Añadir al carrito</button>
                    </div>
               </div>
            
            </div>
        </>
    )
}
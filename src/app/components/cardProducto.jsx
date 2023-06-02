'use client'

import { clienteAxios } from "@/config/axios"
import { CldImage } from "next-cloudinary"
import Image from "next/image"
import { useEffect, useState } from "react"



export const CardProducto = ({producto}) => {


    const [imagenes, setImagenes] = useState(producto.attributes.img.data);


    useEffect(() => {
        console.log(producto.attributes.img.data)
    }, [])

    return(
        <>
            <h3>{producto.attributes.nombre}</h3>
            {imagenes.length !== 0 
                ? (imagenes.map(imagen => (
                    <CldImage
                        key={imagen} 
                        src={imagen.attributes.formats.small.url}
                        width={500}
                        height={500}
                    /> 
                )))
                : null
            }
        </>
    )
}
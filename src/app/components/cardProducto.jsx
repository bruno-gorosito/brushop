import { clienteAxios } from "@/config/axios"
import { CldImage } from "next-cloudinary"
import Image from "next/image"
import { useEffect } from "react"



export const CardProducto = ({producto}) => {


    const cargarProducto = async() => {
        const productoki = await clienteAxios.get(`/api/productos/${producto.id}`)
        console.log(productoki)
    }

    useEffect(() => {
        cargarProducto();
    }, [])
    return(
        <>
            <h3>{producto.attributes.nombre}</h3>
            {/* <CldImage 
                src={producto.attributes}
                width={500}
                height={500}
            /> */}
        </>
    )
}
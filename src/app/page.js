'use client'

import { useContext, useEffect } from "react"
import { authContext } from "./components/context/authContext"
import { CardProducto } from "./components/cardProducto"
import { productoContext } from "./components/context/producto/productoContext"
import Image from "next/image"



export default function Home() {

  const {usuario} = useContext(authContext)
  const {productos, categorias, cargarProductos, cargarCategorias} = useContext(productoContext)


  useEffect(() => {
    cargarCategorias()
    cargarProductos()
  }, [])

  return (
    <>
      <Image 
        src='/banner.png'
        alt="banner-offer"
        width={500}
        height={500}
      />
      <div className="flex flex-wrap px-2 py-4">
      {productos.length !== 0 
        ? (productos.map(producto => (
          <CardProducto 
            key={producto.id}
            producto={producto}
          />
        )))
        : (
          <p>No hay elementos</p>
        )

      }
      </div>
    </>
  )
}

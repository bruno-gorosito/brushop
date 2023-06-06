'use client'

import { useContext, useEffect, useState } from "react"
import { authContext } from "./components/context/authContext"
import { CardProducto } from "./components/cardProducto"
import { productoContext } from "./components/context/producto/productoContext"
import Image from "next/image"
import { CategoriasInicio } from "./components/categoriasInicio"



export default function Home() {

  const {usuario} = useContext(authContext)
  const {productos, categorias, cargarProductos, cargarCategorias} = useContext(productoContext)

  const [mailNews, setMailNews] = useState('')
 
  const suscribeNewsletter = e => {
    e.preventDefault();
    console.log('Subscrito al newsletter')
  }

  useEffect(() => {
    
    cargarProductos()
    cargarCategorias()
  }, [])

  return (
    <>
      <div className="w-full max-w-5xl mx-auto">
        <Image 
          src='/banner.png'
          alt="banner-offer"
          width={1000}
          height={1000}
          className="w-full min-w-full"
        />
      </div>
        {categorias.map(categoria => (
          <CategoriasInicio 
            key={categoria.id}
            categoria={categoria}
          />
        ))}
      {/* <div className="w-full max-w-5xl mx-auto flex flex-wrap px-2 py-4">
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
      </div> */}
      <div className="w-full bg-cyan-900 px-2 py-6 text-white">
        <div className="flex justify-center w-full mb-4 text-lg items-center">
          <svg  className="w-8 aspect-square" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
          </svg>
          <h4 className="ml-2">¡Suscribite a nuestro newsletter!</h4>
        </div>
        <form
          onSubmit={suscribeNewsletter}
        >
          <input 
            type="email"
            name="newsletter"
            onChange={e => setMailNews(e.target.value)}
            className="w-full h-8 rounded outline-cyan-600 border-none text-black px-2"
          />
          <button
            className="w-full py-2 my-2 bg-cyan-600 rounded "
          >Suscribirse</button>
        </form>
      </div>
    </>
  )
}

import { useContext, useEffect, useState } from "react"
import { CardProducto } from "./cardProducto"
import { productoContext } from "./context/producto/productoContext"


export const CategoriasInicio = ({categoria}) => {

    const {productos, cargarProductos} = useContext(productoContext)
    const [productosPorCategoria, setProductosPorCategoria] = useState([])



    const filtrarProductos = () => {
        let productosCat = productos.filter(producto => producto.attributes.categoria.data.id === categoria.id)
        setProductosPorCategoria(productosCat)
    }

    
    useEffect(() => {
        filtrarProductos()
    }, [productos])

    return(
        <>
            <div className="px-2 w-full max-w-5xl mx-auto my-8">
                <div>
                    <h5 className="capitalize pt-4 my-4 after:w-full relative after:bg-gray-400 after:h-0.5 after:absolute hover:after:scale-100 after:top-full after:left-0 after:scale-0 after:transition after:duration-300 after:origin-left hover:cursor-pointer">{categoria.attributes.name}</h5>
                </div>
                <div className="flex overflow-hidden relative w-auto">
                    
                    <div className="w-full flex">
                        {productosPorCategoria.length !== 0 
                            ? (
                                productosPorCategoria.map(producto => (
                                    <CardProducto 
                                        key={producto.id}
                                        producto={producto}
                                    />
                                ))
                            )
                            : <p>No hay elementos</p>
                        }
                    </div>
                    <button
                        className="absolute bg-gradient-to-l from-white to-transparent right-0 w-32 rounded h-full after:top-full dark:from-black text-end"
                    >
                        <div className="w-full flex justify-end relative ">
                            <svg className="w-6 h-6 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </div>
                        <span className="w-full relative dark:text-white">Ver más</span>

                    </button>
                </div>
            </div>
        </>
    )
}

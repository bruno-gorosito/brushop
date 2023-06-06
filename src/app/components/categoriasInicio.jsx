import { useContext, useEffect, useState } from "react"
import { CardProducto } from "./cardProducto"
import { productoContext } from "./context/producto/productoContext"


export const CategoriasInicio = ({categoria}) => {

    const {productos} = useContext(productoContext)
    const [productosPorCategoria, setProductosPorCategoria] = useState([])



    const filtrarProductos = () => {
        let productosCat = productos.filter(producto => producto.attributes.categoria.data.id === categoria.id)
        setProductosPorCategoria(productosCat)
    }

    
    useEffect(() => {
        
        console.log(productos)
        console.log(categoria)
        setTimeout(() => {
            filtrarProductos()
        }, 500)
    }, [])

    return(
        <>
            <div className="px-2 w-full max-w-5xl mx-auto my-8">
                <div>
                    <h5 className="capitalize after:w-full relative after:bg-gray-400 after:h-0.5 after:absolute hover:after:scale-100 after:top-full after:left-0 after:scale-0 after:transition after:duration-300 after:origin-left hover:cursor-pointer">{categoria.attributes.name}</h5>
                </div>
                <div className="flex ">
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
            </div>
        </>
    )
}

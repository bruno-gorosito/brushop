

'use client'

import Image from "next/image"
import Link from "next/link";
import { useContext, useEffect, useState } from "react"
import { authContext } from "./context/authContext";
import { useRouter } from "next/navigation";
import { productoContext } from "./context/producto/productoContext";

export const Header = () => {

    const router = useRouter();

    const authContex = useContext(authContext)
    const productContex = useContext(productoContext)
    const {categorias, cargarCategorias} = productContex
    const {session, validarSesion, cerrarSesion} = authContex;
    const [menu, setMenu] = useState(false)


    useEffect(() => {
        //validarSession
        cargarCategorias()
        validarSesion();
    }, []);

    return(
        <header className="w-full pt-6 bg-cyan-700">
            <Link href="/" className="text-center">
                <Image
                    src="/logo.svg" 
                    width={100} 
                    height={100}
                    alt="logo" 
                    className="mx-auto w-1/2 max-w-sm"
                />
                <p>By: Bruno Gorosito</p>
            </Link>
            
            <div className="flex justify-center px-2 mt-6 mb-4">
                {!session 
                    ? (
                        <>
                            <Link
                                className="border border-black border-opacity-50 rounded-md py-2 px-4"
                                href='/auth/login'
                            >Iniciar sesión</Link>
                            <Link
                                className="border ml-2 border-black border-opacity-50 rounded-md py-2 px-4"
                                href='/auth/register'
                            >Registrarse</Link>
                        </>
                    )
                    : (
                        <button
                            className="border ml-2 border-black border-opacity-50 rounded-md py-2 px-4"
                            onClick={cerrarSesion}
                        >Cerrar sesión</button>
                    )
                }
                
            </div>
            <nav>
                <ul>
                    <li 
                        className="w-full m-0 h-4 relative py-6 text-center apitalize hover:bg-cyan-900 flex items-center justify-end px-4"
                        onClick={() => setMenu(!menu)}    
                    >
                        {!menu 
                            ? (
                                <svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                                    <path fill-rule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
                                </svg>
                            )
                            : (
                                <svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>

                            )
                        }

                    </li>
                    <ul className={`${menu ? "scale-y-100 h-auto" : "scale-y-0 h-0 "} transition-height origin-top`}>
                        {categorias.map(categoria => (
                            <li className="py-4 text-center w-full capitalize hover:bg-cyan-900">
                                {categoria.attributes.name}
                            </li>
                        ))}
                    </ul>
                </ul>
            </nav>
        </header>
    )
}
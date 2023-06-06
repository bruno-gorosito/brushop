

'use client'

import Image from "next/image"
import Link from "next/link";
import { useContext, useEffect, useState } from "react"
import { authContext } from "./context/authContext";
import { useRouter } from "next/navigation";
import { productoContext } from "./context/producto/productoContext";
import { Error } from "./error";

export const Header = () => {

    const router = useRouter();

    const authContex = useContext(authContext)
    const productContex = useContext(productoContext)
    const {categorias, cargarCategorias} = productContex
    const {session, usuario, validarSesion, cerrarSesion} = authContex;
    const [menu, setMenu] = useState(false)


    useEffect(() => {
        //validarSession
        cargarCategorias()
        validarSesion();
    }, []);

    return(
        <>
            <header className="w-full pt-6 md:hidden bg-cyan-600 text-white">
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
                            className="w-full m-0 h-4 relative py-6 text-center apitalize hover:bg-cyan-900 flex items-center justify-between px-4"
                            onClick={() => setMenu(!menu)}    
                        >
                            <div>
                                {session
                                    ? (
                                        <p>Hola {usuario.name}</p>
                                    )
                                    : null
                                }
                            </div>
                            {!menu 
                                ? (
                                    <svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                                        <path d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" />
                                    </svg>
                                )
                                : (
                                    <svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"  />
                                    </svg>

                                )
                            }

                        </li>
                        <ul className={`${menu ? "scale-y-100 h-auto" : "scale-y-0 h-0 "} transition-height origin-top`}>
                            <li 
                                className="py-4 text-center w-full capitalize hover:bg-cyan-900">
                                bebidas
                            </li>
                            <li 
                                className="py-4 text-center w-full capitalize hover:bg-cyan-900">
                                infantil
                            </li>
                            <li 
                                className="py-4 text-center w-full capitalize hover:bg-cyan-900">
                                juguetes
                            </li>
                            <li 
                                className="py-4 text-center w-full capitalize hover:bg-cyan-900">
                                limpieza
                            </li>
                            <li 
                                className="py-4 text-center w-full capitalize hover:bg-cyan-900">
                                Salud
                            </li>
                            {/* {categorias.map(categoria => (
                                <li 
                                    key={categoria.id}
                                    className="py-4 text-center w-full capitalize hover:bg-cyan-900">
                                    {categoria.attributes.name}
                                </li>
                            ))} */}
                        </ul>
                    </ul>
                </nav>
                <Error />
            </header>
            <header className="bg-cyan-600 hidden md:block text-sm py-4">
                <div className="w-full max-w-5xl mx-auto flex justify-between items-center">
                    <Link href="/" className="w-2/12">
                        <Image
                            src="/logo.svg" 
                            width={150} 
                            height={100}
                            alt="logo" 
                            className="h-12"
                        />
                    </Link>
                    <nav className="w-10/12 flex justify-end">
                        <ul className="flex items-center w-3/6 justify-end text-center">
                            <li className="w-1/5 py-2 hover:bg-cyan-900 transition">Bebidas</li>
                            <li className="w-1/5 py-2 hover:bg-cyan-900 transition">Salud</li>
                            <li className="w-1/5 py-2 hover:bg-cyan-900 transition">Juguetes</li>
                            <li className="w-1/5 py-2 hover:bg-cyan-900 transition">Limpieza</li>
                            <li className="w-1/5 py-2 hover:bg-cyan-900 transition">Infantil</li>
                        </ul>
                        <div className="flex justify-center items-center px-2">
                            {!session 
                                ? (
                                    <>
                                        <Link
                                            className="border border-black border-opacity-50 hover:bg-cyan-900 rounded-md py-2 px-4"
                                            href='/auth/login'
                                        >Iniciar sesión</Link>
                                        <Link
                                            className="border ml-2 border-black border-opacity-50 hover:bg-cyan-900  rounded-md py-2 px-4"
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
                    </nav>
                </div>
            </header>
        </>
    )
}
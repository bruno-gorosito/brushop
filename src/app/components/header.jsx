

'use client'

import Image from "next/image"
import Link from "next/link";
import { useContext, useEffect, useState } from "react"
import { authContext } from "./context/authContext";
import { useRouter } from "next/navigation";

export const Header = () => {

    const router = useRouter();

    const context = useContext(authContext)
    const {session, validarSesion, cerrarSesion} = context;



    useEffect(() => {
        //validarSession
        validarSesion();
    }, []);

    return(
        <header className="w-full py-6 bg-cyan-700">
            <div className="text-center">
                <Image
                    src="/logo.svg" 
                    width={100} 
                    height={100} 
                    className="mx-auto w-1/2"
                />
                <p>By: Bruno Gorosito</p>
            </div>
            {!session 
                ? (
                    <>
                        <Link
                            className=""
                            href='/auth/login'
                        >Iniciar sesión</Link>
                        <Link
                            className=""
                            href='/auth/register'
                        >Registrarse</Link>
                    </>
                )
                : (<button
                    onClick={cerrarSesion}
                >Cerrar sesión</button>)
            }
        </header>
    )
}
'use client'

import { authContext } from "@/app/components/context/authContext";
import { redirect, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";




const Login = () => {


    const {session, validarSesion, iniciarSesion} = useContext(authContext)

    const router = useRouter()
    const [usuario, setUsuario] = useState({
        identifier: '',
        password: ''
    })

    const [error, setError] = useState({
        component: null,
        error: true
    })


    const handleChange = e => {
    setUsuario({
        ...usuario,
        [e.target.name] : e.target.value
    })
    }

    const submitForm = async(e) => {
        try {
            e.preventDefault();
            iniciarSesion(usuario)
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        //validar usuario
        validarSesion();
    }, [])

    return(
        <>
            <div className="p-4">
                <form
                    onSubmit={submitForm}
                >
                    <h2 className="text-center text-3xl my-4">Iniciar Sesión</h2>
                <div className='my-2'>
                    <label className='block my-2'>Email o username: </label>
                    <input 
                        type='text'
                        name="identifier"
                        onChange={e => handleChange(e)}
                        className="w-full text-black h-10 rounded outline-cyan-600 px-2"
                    />
                </div>
                <div className='my-4'>
                    <label className='block my-2'>Password: </label>
                    <input 
                        type='password'
                        name="password"
                        onChange={e => handleChange(e)}
                        className="w-full text-black h-10 rounded outline-cyan-600 px-2"
                    />
                </div>
                <button
                    type='submit'
                    className='w-full bg-cyan-600 rounded h-10 font-semibold'
                >Iniciar Sesión</button>
                </form>
            </div>
        </>
    )
}

export default Login


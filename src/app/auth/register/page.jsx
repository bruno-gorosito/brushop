'use client'

import { authContext } from "@/app/components/context/authContext";
import { clienteAxios } from "@/config/axios";
import { redirect, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";




const Login = () => {

    const {session,validarSesion, registrarme} = useContext(authContext)

    const router = useRouter()
    const [usuario, setUsuario] = useState({
        username: '',
        password: '',
        email: ''
    })

    const [password2, setPassword2] = useState('')

    const [error, setError] = useState({
        component: null,
        error: false
    })


    const {username, email, password} = usuario

    const handleChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const submitForm = async(e) => {
        try {
            e.preventDefault();
            if (password !== password2) console.log('ola1')
            if (email.trim() === '') console.log('ola2')
            if (username.trim() === '') console.log('ola3')
            console.log(usuario)
            registrarme(usuario);

            router.back()
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        //validar usuario
        validarSesion()
    }, [])

    return(
        <>
            <div className="p-4">
                <form
                    onSubmit={submitForm}
                >
                    <h2>Registrarme</h2>
                <div className='my-2'>
                    <label className='block my-2'>Correo Electronico: </label>
                    <input 
                        type='email'
                        name="email"
                        onChange={e => handleChange(e)}
                        className="w-full text-black h-10 rounded outline-cyan-600 px-2"
                    />
                </div>
                <div className='my-4'>
                <div className='my-4'>
                    <label className='block my-2'>Username </label>
                    <input 
                        type='text'
                        name="username"
                        onChange={e => handleChange(e)}
                        className="w-full text-black h-10 rounded outline-cyan-600 px-2"
                    />
                </div>
                    <label className='block my-2'>Password: </label>
                    <input 
                        type='password'
                        name="password"
                        onChange={e => handleChange(e)}
                        className="w-full text-black h-10 rounded outline-cyan-600 px-2"
                    />
                </div>
                <div className='my-4'>
                    <label className='block my-2'>Reingresar Password: </label>
                    <input 
                        type='password'
                        name="password2"
                        onChange={e => setPassword2(e.target.value)}
                        className="w-full text-black h-10 rounded outline-cyan-600 px-2"
                    />
                </div>
                <button
                    type='submit'
                    className='w-full bg-cyan-600 rounded h-10 font-semibold'
                >Registrarme</button>
                </form>
            </div>
        </>
    )
}

export default Login


import { clienteAxios } from "@/config/axios";
import { cookies } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";


export async function POST(req, res) {

    try {
        const body = await req.json();
        const resul = await clienteAxios.post('/api/auth/local', body)
        sessionStorage.setItem('auth-jwt', resul.data.jwt);
        console.log(sessionStorage.getItem('auth-jwt'))
        return NextResponse.json({msg: 'Login correcto'})
    } catch (error) {
        return NextResponse.json({error: error.message})
    }
}
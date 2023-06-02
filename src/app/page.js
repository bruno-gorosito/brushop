'use client'

import { useContext } from "react"
import { authContext } from "./components/context/authContext"



export default function Home() {

  const {usuario} = useContext(authContext)

  return (
    <>
      {usuario 
        ? <h1>Ya haré esto, perdón {usuario.username}</h1> 
        : <h1>Logeate y después hablamos, ok?</h1>
      }
    </>
  )
}

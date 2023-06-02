'use client'

import { useContext } from "react"
import { authContext } from "./components/context/authContext"



export default function Home() {

  const {usuario} = useContext(authContext)

  return (
    <>
      <h1>Ya haré esto, perdón {usuario.username}</h1>
    </>
  )
}

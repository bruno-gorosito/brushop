import { useContext } from "react"
import { authContext } from "./context/authContext"


export const Error = () => {

    const {error} = useContext(authContext)

    return (
        <>
            {error !== '' ? <p className="w-full max-w-xl py-4 bg-red-500 border border-red-800  text-center">{error}</p> : null}
        </>
    )
}
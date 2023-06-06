import Image from "next/image"


export const Footer = () => {
    return (
        <>
            <footer className="w-full bg-cyan-600 text-white">
                <div className="w-full max-w-5xl mx-auto">
                    <ul className="w-full flex flex-wrap px-2 py-4 sm:py-10 sm:text-center">
                        <li className="py-1 w-full sm:w-1/4">Acerca de nosotros</li>
                        <li className="py-1 w-full sm:w-1/4">Nuestras promociones</li>
                        <li className="py-1 w-full sm:w-1/4">Ofertas bancarias</li>
                        <li className="py-1 w-full sm:w-1/4">Términos y condiciones</li>
                    </ul>
                    
                    <div className="w-full flex justify-center pb-4">
                        <Image 
                            src="/logo.svg"
                            width={200}
                            height={200}
                        />
                    </div>
                </div>
            </footer>
        </>
    )
}
import Image from "next/image"

export default function NavBar(){
    return (
        <nav className="relative group p-1 pr-2.5">
                {/* <div className="w-full absolute -inset-0.5 bg-gradient-to-r from-pink-600 
                to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition 
                duration-1000 group-hover:duration-200 animate-tilt"></div> */}
                <div className="w-full absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur 
                opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt">
                </div>
                <div className="flex flex-col justify-center border-gray-300 bg-slate-950 backdrop-blur-2xl
            dark:border-neutral-800  dark:from-inherit lg:static lg:w-auto  lg:rounded-xl 
            lg:border gap-2 p-4 pt-3">
                    <div className="w-full">
                        <Image
                            src="/citius_logo_white.svg"
                            width={300}
                            height={300}
                            alt="Picture of the author"
                        />
                    </div>
                </div>
        </nav>
    )
}
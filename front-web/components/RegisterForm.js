'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'

export default function RegisterForm() {
    const router = useRouter()
    const [data, setData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const registerUser = async (e) => {
        e.preventDefault()
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data})
        }) 

        const userInfo = await response.json()
        console.log(userInfo)
        router.push('/login')
    }

    return (
        <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur 
            opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt">
            </div>
            <div className="flex flex-col justify-center border-gray-300 bg-slate-900 backdrop-blur-2xl
            dark:border-neutral-800  dark:from-inherit lg:static lg:w-auto  lg:rounded-xl 
            lg:border gap-2 p-4">
                <h1 className="text-center text-lg border-b border-slate-600 mb-2 pb-2">Register</h1>

                <form className="w-full flex flex-col gap-2 px-2 pb-2 text-sm" onSubmit={registerUser}>
                    <div className="w-full flex-none flex">
                        <label className='flex-none w-20 m-auto'>Username:</label>
                        <input name="username" type="text" className='grow border border-slate-800 rounded p-2 bg-slate-800 autofill:transition-colors autofill:duration-[5000000ms]' 
                        required
                        value={data.username}
                        onChange={(e) => {setData({...data, username:e.target.value})}}
                        />
                    </div>
                    <div className="w-full flex-none flex">
                        <label className='flex-none w-20 m-auto'>email:</label>
                        <input name="email" type="text" className='grow border border-slate-800 rounded p-2 bg-slate-800 autofill:transition-colors autofill:duration-[5000000ms]' 
                        required
                        value={data.email}
                        onChange={(e) => {setData({...data, email:e.target.value})}}
                        />
                    </div>
                    <div className="w-full flex-none flex">
                        <label className='flex-none w-20 m-auto'>Password:</label>
                        <input name="password" type="password" className='grow border border-slate-800 rounded p-2 bg-slate-800 autofill:transition-colors autofill:duration-[5000000ms]' 
                        required
                        value={data.password}
                        onChange={(e) => {setData({...data, password:e.target.value})}}
                        />
                    </div>
                    <div className='w-full flex gap-2 justify-center border-t border-slate-600 mt-2 pt-2'>
                        <button className="w-1/2 border border-slate-600 p-2 rounded">
                            Login
                        </button>
                        <button className="w-1/2 border border-slate-600 p-2 rounded">
                            Register
                        </button>
                    </div>

                </form>
            </div>

        </div>
    )
}
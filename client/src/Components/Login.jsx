import React, { useContext, useState } from 'react'
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { FinanceContext } from '../Context/AppContext';

const Login = ({ closeForm }) => {
    const { fetchCurrAdmin, setIsAuthenticated } = useContext(FinanceContext)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [_, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!username) {
            toast.warning("Please Enter a Username");
        }
        if (!password) {
            toast.warning("Please Enter a Password!");
        }

        if (username && password) {
            try {
                const res = await axios.post("http://localhost:3000/auth/login", { username, password })
                setCookies("access_token", res?.data?.token)
                localStorage.setItem("adminID", res?.data?.adminID)
                localStorage.setItem("role", res?.data?.superAdmin)
                fetchCurrAdmin()
                if (username && res?.data?.adminID) {
                    setIsAuthenticated(true);
                    navigate("/admin-home");
                } else {
                    toast.error("Invalid Credentials!");
                }
            } catch (error) {
                toast.error("Invalid Credentials!")
            }
        }
    }
    return (
        <div className='modal'>
            <div className="modalOverlay"></div>
            <div className="w-[400px] bg-secondary shadow-lg rounded-md p-8 z-50 flex flex-col justify-center items-center absolute top-48 left-[450px]" data-aos="zoom-in" >
                <h1 className='mb-4 font-bold text-xl text-main'><span className='text-title'>SM</span> Finance Admin Login</h1>

                <form onSubmit={handleSubmit}>
                    <input type="text" id='username' className='w-full focus:outline-none focus:border focus:border-title border rounded-md mb-3 border-slate-700 bg-transparent text-main text-sm p-2' placeholder='Enter Username' value={username}
                        onChange={(e) => setUsername(e.target.value)} />

                    <input type="password" id='password' className='w-full focus:outline-none focus:border focus:border-title border rounded-md mb-3 border-slate-700 bg-transparent text-main text-sm p-2' placeholder='Password' value={password}
                        onChange={(e) => setPassword(e.target.value)} />

                    <div className="grid grid-cols-2 items-center gap-3">
                        <button className='btn rounded-md bg-blue-500 hover:bg-blue-600 font-semibold text-main' type='submit'>Login</button>
                        <button className='btn rounded-md bg-gray-500 hover:bg-gray-600 font-semibold text-main' onClick={closeForm}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
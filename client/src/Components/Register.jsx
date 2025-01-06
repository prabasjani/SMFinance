import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { toast } from "sonner"
import ConfirmationModal from './ConfirmationModal';

const Register = () => {
    // Add A new Customer
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setmobile] = useState(0);
    const [investment, setInvestment] = useState(0);
    const [password, setPassword] = useState("");


    const [modalOpen, setModalOpen] = useState(false)
    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:3000/auth/register", { username, email, mobile, investment, password })
            toast.success(res?.data?.message)
            navigate("/admin-home")
            toggleModal()
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className='box relative '>
            <div className="w-[400px] bg-secondary shadow-lg rounded-md p-8 flex flex-col justify-center absolute top-16 left-[450px]">
                <h1 className='mb-4 font-bold text-xl text-main'>Register <span className='text-title'>New Admin</span></h1>

                <form onSubmit={handleSubmit}>
                    <input type="text" id='username' className='w-full focus:outline-none focus:border focus:border-title border rounded-md mb-3 border-slate-700 bg-transparent text-main text-sm p-2' placeholder='Username' onChange={(e) => setUsername(e.target.value)} required />
                    <input type="email" id='email' className='w-full focus:outline-none focus:border focus:border-title border rounded-md mb-3 border-slate-700 bg-transparent text-main text-sm p-2' placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} required />
                    <input type="text" id='mobile' className='w-full focus:outline-none focus:border focus:border-title border rounded-md mb-3 border-slate-700 bg-transparent text-main text-sm p-2' placeholder='Mobile Number' maxLength={10} onChange={(e) => Number(setmobile(e.target.value))} required />
                    <input type="number" id='investment' className='w-full focus:outline-none focus:border focus:border-title rounded-md mb-3 border border-slate-700 bg-transparent text-main text-sm p-2' placeholder='Investment' maxLength={10} onChange={(e) => setInvestment(e.target.value)} required />
                    <input type="password" id='password' className='w-full focus:outline-none focus:border focus:border-title border rounded-md mb-3 border-slate-700 bg-transparent text-main text-sm p-2' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />


                    {/* Add Admin Modal */}
                    {modalOpen && <ConfirmationModal title="Add Admin" color="#16a34a" closeModal={toggleModal} name={username?.toUpperCase()} />}

                </form>
                <div className="grid grid-cols-2 items-center gap-4 mt-2">
                    <button className='btn rounded-md bg-blue-500 hover:bg-blue-600 font-semibold text-main' onClick={toggleModal}>Add Admin</button>
                    <button className='btn rounded-md bg-gray-500 hover:bg-gray-600 font-semibold text-main' onClick={() => navigate("/admin-home")}>Cancel</button>
                </div>
            </div>

        </div>
    )
}

export default Register
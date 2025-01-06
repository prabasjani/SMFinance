import React, { useContext, useEffect, useState } from 'react'
import { FinanceContext } from '../Context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmationModal from '../Components/ConfirmationModal';
import { toast } from 'sonner'
import axios from 'axios';

const UpdateAdmin = () => {
    const { adminData } = useContext(FinanceContext)
    // Update Customer
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setmobile] = useState(0);
    const [investment, setInvestment] = useState(0);
    const [password, setPassword] = useState("");

    const navigate = useNavigate()
    const { id } = useParams()
    // Find the Customer using params id 
    const admin = adminData?.adminsInfo?.find(admin => admin?._id === id)

    // Update Customer
    const updateAdmin = async (id) => {
        await axios.put(
            `http://localhost:3000/auth/admin-controls/update-admin/${id}`,
            {
                username, email, mobile, investment, password
            }
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateAdmin(admin?._id);
        toast.success(
            `${admin?.username?.toUpperCase()}'s profile was updated!`
        );
        navigate(-1);
    };

    useEffect(() => {
        setUsername(admin?.username)
        setEmail(admin?.email)
        setmobile(admin?.mobile)
        setInvestment(admin?.investment)
        setPassword(admin?.password)
    }, [])
    // Popup Modal state
    const [modalOpen, setModalOpen] = useState(false)
    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }

    return (
        <div className='box relative'>
            <div className="w-[400px] bg-secondary shadow-lg rounded-md p-8 flex flex-col justify-center absolute top-16 left-[450px]">
                <h1 className='mb-4 font-bold text-xl text-main'>Update <span className='text-title'>{admin?.username?.toUpperCase()}</span>'s info</h1>

                <form onSubmit={handleSubmit}>
                    <input type="text" id='username' className='w-full focus:outline-none focus:border focus:border-title border rounded-md mb-3 border-slate-700 bg-transparent text-main text-sm p-2' placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} />
                    <input type="email" id='email' className='w-full focus:outline-none focus:border focus:border-title border rounded-md mb-3 border-slate-700 bg-transparent text-main text-sm p-2' placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} value={email} />
                    <input type="text" id='mobile' className='w-full focus:outline-none focus:border focus:border-title border rounded-md mb-3 border-slate-700 bg-transparent text-main text-sm p-2' placeholder='Mobile Number' maxLength={10} onChange={(e) => Number(setmobile(e.target.value))} value={mobile} />
                    <input type="number" id='investment' className='w-full focus:outline-none focus:border focus:border-title rounded-md mb-3 border border-slate-700 bg-transparent text-main text-sm p-2' placeholder='Investment' maxLength={10} onChange={(e) => setInvestment(e.target.value)} value={investment} />
                    <input type="password" id='password' className='w-full focus:outline-none focus:border focus:border-title border rounded-md mb-3 border-slate-700 bg-transparent text-main text-sm p-2' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />

                    {/* Update Admin Modal */}
                    {modalOpen && <ConfirmationModal title="Update" color="#16a34a" closeModal={toggleModal} name={username?.toUpperCase()} />}

                </form>
                <div className="grid grid-cols-2 items-center gap-4 mt-2">
                    <button className='btn rounded-md bg-blue-500 hover:bg-blue-600 font-semibold text-main' onClick={toggleModal}>Update Admin</button>
                    <button className='btn rounded-md bg-gray-500 hover:bg-gray-600 font-semibold text-main' onClick={() => navigate(-1)}>Cancel</button>
                </div>
            </div>

        </div>
    )
}

export default UpdateAdmin
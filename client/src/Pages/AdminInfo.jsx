import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { FinanceContext } from '../Context/AppContext'
import axios from 'axios'
import { toast } from 'sonner'

// React Icons
import { MdOutlineCloudUpload } from "react-icons/md"
import { FaTrashAlt } from "react-icons/fa"
import { IoArrowBack } from "react-icons/io5"

// Confirmation Popup Modal
import ConfirmationModal from '../Components/ConfirmationModal'

const AdminInfo = () => {
    const { adminData, isSuperAdmin } = useContext(FinanceContext)
    const { id } = useParams()
    const navigate = useNavigate()

    // Find the Admin using params id 
    const admin = adminData?.adminsInfo?.find(admin => admin._id === id)

    const handleAdminDelete = async () => {
        await axios.delete(`http://localhost:3000/auth/admin-controls/delete-admin/${id}`)
        toast.info(`${admin?.username?.toUpperCase()} details was Deleted!`)
        navigate("/admin-home")
    }

    // Popup Modal state
    const [modalOpen, setModalOpen] = useState(false)
    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }
    // Toggle modal if Super Admin Access
    const toggleDelete = () => {
        isSuperAdmin ? toggleModal() : toast.warning("Access Denied! Login Super Admin Account")
    }

    // Update while Super Admin Login
    const toggleUpdate = (id) => {
        if (isSuperAdmin) {
            navigate(`/update-admin/${id}`)
        } else {
            toast.warning("Access Denied! Login Super Admin Account")
        }
    }

    return (
        <div className='px-10 py-5 box sm:flex sm:flex-col justify-center relative'>
            <h1 className='text-2xl text-main font-bold mb-7'>Mr.{admin?.username?.toUpperCase()}'s Info</h1>

            <div className="bg-secondary rounded-md p-3 sm:p-4 grid grid-cols-2 gap-0 sm:gap-5" data-aos="zoom-in">
                <div className="col">
                    <h3 className='text-sm sm:text-xl font-semibold my-4'>Email Address</h3>
                    <h3 className='text-sm sm:text-xl font-semibold my-4'>Mobile Number</h3>
                    <h3 className='text-sm sm:text-xl font-semibold my-4'>Investment</h3>
                    <h3 className='text-sm sm:text-xl font-semibold my-4'>Role</h3>
                </div>
                <div className="col">
                    <h3 className='text-main text-sm sm:text-xl font-semibold my-4'>{admin?.email}</h3>
                    <h3 className='text-main text-sm sm:text-xl font-semibold my-4'>{admin?.mobile}</h3>
                    <h3 className='text-green-600 text-sm sm:text-xl font-semibold my-4'>₹. {admin?.investment}</h3>
                    <h3 className='text-main text-sm sm:text-xl font-semibold my-4'>{admin?.role}</h3>
                </div>
            </div >
            <div className="flex items-center gap-4 mt-8 justify-end">
                <button className='btn flex items-center gap-2 rounded-md font-bold bg-blue-500 hover:bg-blue-600 text-main' onClick={() => toggleUpdate(admin?._id)} data-aos="fade-up" data-aos-duration="600">Update <MdOutlineCloudUpload /></button>
                <button className='btn flex items-center gap-2 rounded-md font-bold bg-red-500 hover:bg-red-600 text-main' onClick={toggleDelete} data-aos="fade-up" data-aos-duration="1000">Delete <FaTrashAlt /></button>
                <Link className='btn flex items-center gap-2 rounded-md font-bold bg-gray-400 hover:bg-gray-500 text-secondary' to="/admin-home" data-aos="fade-up" data-aos-duration="1400">Back <IoArrowBack /></Link>
            </div>

            {/* Confirmation Modal */}
            {/* Delete Modal */}
            {modalOpen && <ConfirmationModal title="Delete" color="red" closeModal={toggleModal} action={handleAdminDelete} name={admin?.username?.toUpperCase()} />}

        </div >
    )
}

export default AdminInfo
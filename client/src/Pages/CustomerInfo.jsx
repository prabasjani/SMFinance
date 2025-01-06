import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from "sonner"
import ConfirmationModal from '../Components/ConfirmationModal'
import { FinanceContext } from '../Context/AppContext'

// React Icons
import { MdOutlineCloudUpload } from "react-icons/md"
import { FaTrashAlt } from "react-icons/fa"
import { IoArrowBack } from "react-icons/io5"

const CustomerInfo = () => {
    const { customerData } = useContext(FinanceContext)
    const { id } = useParams()
    const navigate = useNavigate()

    const customer = customerData?.find(customer => customer._id === id)

    const handleCustomerDelete = async () => {
        await axios.delete(`http://localhost:3000/auth/admin-controls/delete-customer/${id}`)
        toast.info(`${customer?.customerName?.toUpperCase()} details was Deleted!`)
        navigate("/all-customers")
    }

    // Popup Modal state
    const [modalOpen, setModalOpen] = useState(false)
    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }

    return (
        <div className='px-10 py-5 box flex flex-col justify-center relative'>
            <h1 className='text-2xl text-main font-bold mb-3'>Mr.{customer?.customerName?.toUpperCase()}'s Info</h1>

            <div className="bg-secondary rounded-md p-4 grid grid-cols-2 gap-0" data-aos="zoom-in">
                <div className="col">
                    <h3 className='text-lg font-semibold my-2'>Aadhar Number</h3>
                    <h3 className='text-lg font-semibold my-2'>Mobile Number</h3>
                    <h3 className='text-lg font-semibold my-2'>Credit Amount</h3>
                    <h3 className='text-lg font-semibold my-2'>Interest Rate</h3>
                    <h3 className='text-lg font-semibold my-2'>Credit Type</h3>
                    <h3 className='text-lg font-semibold my-2'>Credit Status</h3>
                    <h3 className='text-lg font-semibold my-2'>Credit Date</h3>
                    <h3 className='text-lg font-semibold my-2'>Last Paid Date</h3>
                    <h3 className='text-lg font-semibold my-2'>Next Due Date</h3>
                </div>
                <div className="col">
                    <h3 className='text-main text-lg font-semibold my-2'>{customer?.aadharNumber}</h3>
                    <h3 className='text-main text-lg font-semibold my-2'>{customer?.mobileNumber}</h3>
                    <h3 className='text-green-600 text-lg font-semibold my-2'>₹. {customer?.creditAmount}</h3>
                    <h3 className='text-main text-lg font-semibold my-2'>{customer?.interestRate * 100} %</h3>
                    <h3 className='text-main text-lg font-semibold my-2'>{customer?.creditType === "monthly" ? "Monthly" : "Weekly"}</h3>
                    <h3 className='text-main text-lg font-semibold my-2'>{customer?.creditStatus} / 10</h3>
                    <h3 className='text-main text-lg font-semibold my-2'>{customer?.createdAt?.slice(0, 10)}</h3>
                    <h3 className='text-main text-lg font-semibold my-2'>{customer?.updatedAt?.slice(0, 10)}</h3>
                    <h3 className='text-main text-lg font-semibold my-2'>{customer?.createdAt}</h3>
                </div>
            </div >
            <div className="flex items-center gap-4 mt-4 justify-end">
                <Link className='btn flex items-center gap-2 rounded-md font-bold bg-blue-500 hover:bg-blue-600 text-main' to={`/update-customer/${customer?._id}`}>Update <MdOutlineCloudUpload /></Link>
                <button className='btn flex items-center gap-2 rounded-md font-bold bg-red-500 hover:bg-red-600 text-main' onClick={toggleModal}>Delete <FaTrashAlt /></button>
                <Link className='btn flex items-center gap-2 rounded-md font-bold bg-gray-400 hover:bg-gray-500 text-secondary' to="/all-customers">Back <IoArrowBack /></Link>
            </div>

            {/* Confirmation Modal */}
            {/* Delete Modal */}
            {modalOpen && <ConfirmationModal title="Delete" color="red" closeModal={toggleModal} action={handleCustomerDelete} name={customer?.customerName?.toUpperCase()} />}
        </div >
    )
}

export default CustomerInfo
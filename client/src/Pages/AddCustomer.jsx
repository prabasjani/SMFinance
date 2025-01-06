import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "sonner"
import ConfirmationModal from '../Components/ConfirmationModal'

const AddCustomer = () => {
    // Add A new Customer
    const [customerName, setCustomerName] = useState("");
    const [aadharNumber, setAadharNumber] = useState(0);
    const [mobileNumber, setMobileNumber] = useState(0);
    const [creditAmount, setCreditAmount] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [creditType, setCreditType] = useState("");

    const [modalOpen, setModalOpen] = useState(false)
    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:3000/auth/admin-controls/add-customer", { customerName, aadharNumber, mobileNumber, creditAmount, interestRate, creditType })
            toast.success(res?.data?.message)
            navigate("/all-customers")
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <div className='box relative flex items-center justify-center'>
            <div className="bg-secondary h-[475px] w-[500px] rounded-md p-5">
                <h1 className='text-lg text-main font-bold mb-4 mt-3'>Add New Customer</h1>
                <form className="max-w-md" onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-main bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setCustomerName(e.target.value)} />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Customer Name</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-main bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setAadharNumber(e.target.value)} maxLength={12} />
                        <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Aadhar Number</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-main bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setMobileNumber(e.target.value)} maxLength={10} />
                        <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mobile Number</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-main bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => Number(setCreditAmount(e.target.value))} />
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Credit Amount</label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <select className="block py-2.5 px-0 w-full text-sm text-main bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" onChange={(e) => Number(setInterestRate(e.target.value))}>
                                <option className="text-sub">Interest Rate</option>
                                <option value="0.05" className="text-sub">5%</option>
                                <option value="0.1" className="text-sub">10%</option>
                            </select>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <select className="block py-2.5 px-0 w-full text-sm text-main bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" onChange={(e) => setCreditType(e.target.value)}>
                                <option className="text-sub">Credit Type</option>
                                <option value="weekly" className="text-sub">Weekly</option>
                                <option value="monthly" className="text-sub">Monthly</option>
                            </select>
                        </div>
                    </div>

                    {/* Add Customer Modal */}
                    {modalOpen && <ConfirmationModal title="Add Customer" color="#16a34a" closeModal={toggleModal} name={customerName?.toUpperCase()} type="submit" />}

                </form>
                <div className="flex items-center gap-4 mt-2">
                    <button onClick={toggleModal} className="btn bg-blue-500 hover:bg-blue-600 rounded-md text-main font-bold text-[14px]">Add Customer</button>
                    <Link className='btn rounded-md font-bold bg-gray-400 hover:bg-gray-500 text-secondary' to="/all-customers">Back</Link>
                </div>
            </div>
        </div>
    )
}

export default AddCustomer
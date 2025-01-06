import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Register from '../Components/Register'
import Login from '../Components/Login'
import { toast } from 'sonner'

// Icons
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

const CustomerView = () => {
    const [mobile, setMobile] = useState("")
    const [customerData, setCustomerData] = useState([])

    const fetchCustomerData = async () => {
        const res = await axios.get("http://localhost:3000/auth/admin-controls/customers-info")
        setCustomerData(res?.data?.data)
    }
    const customer = customerData?.filter(customer => customer?.mobileNumber == Number(mobile))

    const handleSubmit = (e) => {
        try {
            e.preventDefault()
            if (mobile.length < 10) {
                toast.error("Please enter a valid Mobile Number!")
            }
            fetchCustomerData()
        } catch (error) {
            toast.error(error?.message)
        }
    }

    // 9783463894
    const [open, setOpen] = useState(false)
    const closeForm = () => {
        setOpen(false)
    }

    let getTime = new Date().getHours();
    let greet = getTime < 12 ? "Good Morning..." : getTime >= 12 && getTime < 16 ? "Good Afternoon..." : "Good Evening...";

    const lastUpdated = new Date(customer?.[0]?.updatedAt?.slice(0, 10))
    const nextWeek = lastUpdated?.setDate(lastUpdated.getDate() + 7)
    const nextDueDate = new Date(nextWeek)


    return (
        <div className='box overflow-hidden'>
            <h1 className='text-xl sm:text-3xl font-semibold mt-4 text-center'>Welcome to SM Finance</h1>
            <div className="grid grid-cols-2 gap-8 mt-8">
                {customer?.[0]?.mobileNumber == mobile ? (
                    <div className="col mt-5" data-aos="fade-up">
                        <h1 className='text-2xl font-semibold text-main mb-4'>Hello <span className='text-title font-bold tracking-widest'>{customer && customer?.[0]?.customerName?.toUpperCase()},</span> {greet}</h1>
                        <div className="grid grid-cols-2 gap-4 border border-slate-700 rounded-md p-4">
                            <div className="col">
                                <h1 className='text-lg text-main mt-2 font-bold'>Customer Name</h1>
                                <h2 className='text-base font-semibold mt-2'>Credit Amount</h2>
                                <h2 className='text-base font-semibold mt-2'>Interest Rate</h2>
                                <h2 className='text-base font-semibold mt-2'>Credit Type</h2>
                                <h2 className='text-base font-semibold mt-2'>Credit Status</h2>
                                <h2 className='text-base font-semibold mt-2'>Credit Date</h2>
                                <h2 className='text-base font-semibold mt-2'>Next Due Date</h2>
                            </div>
                            <div className="col">
                                <h1 className='text-lg text-main mt-2 font-bold'>{customer && customer?.[0]?.customerName?.toUpperCase()}</h1>
                                <h1 className='text-base font-semibold mt-2 text-green-500'>₹. {customer && customer?.[0]?.creditAmount}</h1>
                                <h1 className='text-base font-semibold mt-2'>{customer && customer?.[0]?.interestRate * 100}%</h1>
                                <h1 className='text-base font-semibold mt-2'>{customer && customer?.[0]?.creditType === "monthly" ? "Monthly" : "Weekly"}</h1>
                                <h1 className='text-base font-semibold mt-2'><span className='text-title'>{customer && customer?.[0]?.creditStatus}</span> / 10</h1>
                                <h1 className='text-base font-semibold mt-2'>{customer && (customer?.[0]?.createdAt)?.slice(0, 10)}</h1>
                                <h1 className='text-base font-semibold mt-2'>{Date(nextDueDate)?.slice(0, 16)}</h1>
                            </div>
                        </div>
                    </div>) :
                    (<form onSubmit={handleSubmit} className='col mt-7' data-aos="fade-down">
                        <div className="flex flex-col justify-center gap-4 border border-slate-700 rounded-md p-4">
                            <h1 className='text-2xl font-semibold text-main'>Hello, {greet}</h1>
                            <p className='leading-8'>If you are a <span className='text-main'>Customer in <span className='text-title'>SM</span> Finance</span> please enter your Mobile number to <span className='text-main'>verify your account</span> details and then pay through the Online payments. Further info feel free to contact us... </p>
                            <input type="text" maxLength={10} onChange={(e) => Number(setMobile(e.target.value))} placeholder='Please enter your Mobile Number...' className='p-2 bg-transparent w-[400px] text-main focus:outline-none border border-slate-700 rounded-md font-semibold' />
                            <button type='submit' className='btn w-[400px] bg-blue-500 rounded-md text-main font-semibold'>Get Details</button>
                        </div>
                    </form>)
                }

                <div className="col" data-aos="fade-left">
                    <h1 className='text-3xl text-main font-bold my-4 tracking-widest'><span onClick={() => setOpen(true)} className='text-title'>SM</span> Finance</h1>
                    <p className='leading-8'>Empowering <span className='text-main'>financial growth</span> through tailored loan solutions and expert financial management services. Our company is dedicated to providing personalized <span className='text-main'>support to help individuals and business</span> achieve their financial goals with confidence and ease.</p>
                    <div className="my-4">
                        <span className='flex items-center gap-3 text-main cursor-pointer hover:text-main'><IoCallOutline /> +91 9584736201</span>
                        <span className='flex items-center gap-3 text-main cursor-pointer mt-2'><FaLocationDot /> Krishnagiri Dt</span>
                    </div>
                    <div className="flex items-center gap-6 mt-6">
                        <FaWhatsapp size={30} className='hover:text-main cursor-pointer' title='9584736201' />
                        <FaInstagram size={30} className='hover:text-main cursor-pointer' title='insta@rajkumar.com' />
                        <IoIosMail size={30} className='hover:text-main cursor-pointer' title='support@smfinance.com' />
                    </div>
                </div>
            </div>

            {open && <Login closeForm={closeForm} />}
        </div >
    )
}
export default CustomerView
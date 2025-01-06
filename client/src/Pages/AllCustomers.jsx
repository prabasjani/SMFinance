import React, { useContext, useEffect, useRef, useState } from 'react'
import CustomerTable from '../Components/CustomerTable'

import { FaUserPlus } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { FaDownload } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import PopupCustChart from '../Components/PopupCustChart';
import { FinanceContext } from '../Context/AppContext';

import { useReactToPrint } from "react-to-print"
import { toast } from 'sonner';

const AllCustomers = () => {
    const { customerData } = useContext(FinanceContext)
    const [searchCust, setSearchCust] = useState("")
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()

    // Print data using react-to-print by using useRef
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    const closeModal = () => {
        setModal(false)
    }

    return (
        <div className='box overflow-hidden'>
            <div className="flex items-center justify-between mb-4">
                <input type="text" className='bg-transparent border border-sub focus:outline-none btn rounded-md w-3/5 text-[10px] tracking-widest' placeholder='Search Customer by entering Name or Mobile Number or Aadhar Number ' onChange={(e) => setSearchCust(e.target.value)} data-aos="fade-down" data-aos-duration="1000" />
                <button className='flex items-center gap-2 text-main btn bg-green-500 hover:bg-green-600 rounded-md text-[12px] font-bold' onClick={reactToPrintFn} data-aos="fade-down" data-aos-duration="600">Download Data <FaDownload /> </button>
                <button className='flex items-center gap-2 text-main btn bg-gray-700 hover:bg-gray-600 rounded-md text-[12px] font-bold' onClick={() => setModal(!modal)} data-aos="fade-down" data-aos-duration="1000">customers Data <IoStatsChart /> </button>
                <button className='flex items-center gap-2 text-main btn bg-blue-500 hover:bg-blue-600 rounded-md text-[12px] font-bold' onClick={() => navigate("/add-customer")} data-aos="fade-down" data-aos-duration="1400">Add User <FaUserPlus /> </button>
            </div>
            <CustomerTable searchCust={searchCust} customerData={customerData} contentRef={contentRef} />
            {modal && <PopupCustChart closeModal={closeModal} customerData={customerData} />}
        </div>
    )
}

export default AllCustomers
import React from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts'

import { IoMdCloseCircle } from "react-icons/io";

const PopupCustChart = ({ closeModal, customerData }) => {
    return (
        <div className="modal">
            <div className="modalOverlay"></div>
            <div className="w-[1120px] h-[400px] bg-secondary rounded-md p-8 z-50 absolute top-24 left-20" data-aos="zoom-in">
                <h1 className='text-main font-bold mb-4'>Customers Credit Amount Data</h1>
                <button className='absolute -top-6 -right-6 hover:text-main' onClick={closeModal}><IoMdCloseCircle size={50} /></button>
                <ResponsiveContainer className='text-[12px] pb-5'>
                    <BarChart width={730} height={250} data={customerData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="customerName" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="creditAmount" fill="#2997FF" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div >
    )
}

export default PopupCustChart
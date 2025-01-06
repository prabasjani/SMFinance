import React from 'react'
import { Link } from 'react-router-dom'

const CustomerTable = ({ searchCust, customerData, contentRef }) => {

    return (
        <div className="relative flex flex-col scrollBarHide overflow-y-scroll w-full h-[450px] bg-secondary text-main shadow-md rounded-lg bg-clip-border" data-aos="fade-up">
            <table ref={contentRef} className="w-full text-left table-auto min-w-max relative">
                <thead>
                    <tr>
                        <th className="p-4 border-b border-slate-300 bg-gray-500">
                            <p className="block text-sm font-bold leading-none text-main">
                                Name
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-300 bg-gray-500">
                            <p className="block text-sm font-bold leading-none text-main">
                                Mobile
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-300 bg-gray-500">
                            <p className="block text-sm font-bold leading-none text-main">
                                Amount
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-300 bg-gray-500">
                            <p className="block text-sm font-bold leading-none text-main">
                                Interest
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-300 bg-gray-500">
                            <p className="block text-sm font-bold leading-none text-main">
                                Type
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-300 bg-gray-500">
                            <p className="block text-sm font-bold leading-none text-main">
                                Status
                            </p>
                        </th>
                    </tr>
                </thead>
                {customerData?.length > 0 ? (<tbody>
                    {customerData?.filter((customer) => {
                        return (
                            customer?.customerName.toLowerCase().includes(searchCust) ||
                            String(customer?.mobileNumber).includes(searchCust) ||
                            String(customer?.aadharNumber).includes(searchCust)
                        );
                    })?.map((customer, i) => {
                        return (
                            <tr to={`customer-info/${customer._id}`} key={i} className="hover:bg-slate-800 text-sub hover:text-main" >
                                <td className="p-4 border-b border-slate-200">
                                    <Link to={`/customer-info/${customer._id}`} className="block text-[12px]">
                                        {customer?.customerName?.toUpperCase()}
                                    </Link>
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    <p className="block text-[12px] ">
                                        {customer?.mobileNumber}
                                    </p>
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    <p className="block text-[12px]">
                                        ₹.{customer?.creditAmount}
                                    </p>
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    <p className="block text-[12px]">
                                        {customer?.interestRate * 100} %
                                    </p>
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    <p className="block text-[12px]">
                                        {customer?.creditType === "monthly" ? "Monthly" : "Weekly"}
                                    </p>
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    <p className="block text-[12px]">
                                        {customer?.creditStatus} / 10
                                    </p>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>) : (<h1 className='text-red-600 text-3xl font-bold animate-pulse absolute top-48 left-60'>Something went wrong! Try again later!</h1>)}
            </table>
        </div >

    )
}

export default CustomerTable
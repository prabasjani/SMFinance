import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import AdminCard from '../Components/AdminCard'
import { FinanceContext } from '../Context/AppContext'

import { GiPayMoney } from "react-icons/gi";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import AdminBarChart from '../Components/AdminBarChart';

const AdminHome = () => {
    const { adminData, currAdmin } = useContext(FinanceContext)

    let getTime = new Date().getHours();
    let greet = getTime < 12 ? "Good Morning..." : getTime >= 12 && getTime < 16 ? "Good Afternoon..." : "Good Evening...";
    return (
        <div className='px-8 py-5 box flex flex-col relative overflow-hidden' >
            <h1 className='text-xl sm:text-2xl font-semibold mb-4' data-aos="fade-down" data-aos-duration="2200">Welcome Mr. <span className='text-title tracking-widest'>{currAdmin ? currAdmin : "Guest"}</span>, {greet}</h1>
            <div className="flex flex-col gap-2 sm:grid sm:grid-cols-4 sm:gap-5">
                <AdminCard adminData={adminData?.TotalInvestment} title="Total Investment" icon={<GiPayMoney size={60} style={{ padding: "10px", borderRadius: "100px", background: "black", height: "60px", weight: "60px" }} />} dataaos="fade-down" dataaosduration="800" />
                <AdminCard adminData={adminData?.BalanceInvestment} title="Available Investment" icon={<RiMoneyRupeeCircleLine size={60} style={{ padding: "10px", borderRadius: "100px", background: "black", height: "60px", weight: "60px" }} />} dataaos="fade-down" dataaosduration="1200" />
                <AdminCard adminData={adminData?.TotalCredit} title="Total Credit" icon={<GiTakeMyMoney size={60} style={{ padding: "10px", borderRadius: "100px", background: "black", height: "60px", weight: "60px" }} />} dataaos="fade-down" dataaosduration="1600" />
                <AdminCard adminData={adminData?.TotalProfit} title="Total Profit" icon={<GiReceiveMoney size={60} style={{ padding: "10px", borderRadius: "100px", background: "black", height: "60px", weight: "60px" }} />} dataaos="fade-down" dataaosduration="2000" />
            </div>
            {adminData.length != 0 ? (<div className="mt-3 flex flex-col gap-3 sm:mt-5 sm:grid sm:grid-cols-2 sm:gap-5" data-aos="zoom-in">
                <div className="h-[300px] px-6 pt-6 pb-3 rounded-md border border-gray-700 text-[12px]">
                    <AdminBarChart adminData={adminData} />
                </div>
                <div className="rounded-md border border-gray-700 px-5 sm:px-10 py-3 grid grid-cols-2 items-center">
                    <div className="col flex flex-col gap-6">
                        <h2 className='text-main text-base sm:text-lg font-bold'>Admin Name</h2>
                        {adminData?.adminsInfo?.map((admin, i) => {
                            return <Link to={`/admin-info/${admin._id}`} className='hover:text-main text-base sm:text-lg' key={i}>{admin?.username?.toUpperCase()}</Link>
                        })}
                    </div>
                    <div className="col flex flex-col gap-6">
                        <h2 className='text-main text-base sm:text-lg font-bold'>Investment</h2>
                        {adminData?.adminsInfo?.map((admin, i) => {
                            return <h1 className='font-bold text-base sm:text-lg' key={i}>₹. {admin?.investment}</h1>
                        })}
                    </div>
                </div>
            </div>) : (<h1 className='text-red-600 text-3xl font-bold animate-pulse absolute top-60 left-80'>Something went wrong! Try again later!</h1>)}
        </div>
    )
}

export default AdminHome
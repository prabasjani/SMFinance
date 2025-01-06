import React, { useContext } from 'react'
// import ProfitBarChar from '../Components/ProfitBarChar'
import { Link } from 'react-router-dom'
import AdminPieChar from '../Components/AdminPieChar'
import { FinanceContext } from '../Context/AppContext'

const Profits = () => {
    const { adminData } = useContext(FinanceContext)

    return (
        <div className='box relative overflow-hidden'>
            <h1 className='text-2xl font-bold text-main mb-4 mt-12' data-aos="fade-down">Profits for Each Admin</h1>

            {adminData?.length != 0 ? (
                <div className="flex items-center justify-between">
                    <div className="rounded-md shadow-md bg-secondary py-5 " data-aos="fade-down-right">
                        <div className="grid grid-cols-4 gap-10 px-10 pb-4 border-b">
                            <h2 className='text-main text-base sm:text-lg font-bold'>Admin Name</h2>
                            <h2 className='text-main text-base sm:text-lg font-bold'>Investment</h2>
                            <h2 className='text-main text-base sm:text-lg font-bold'>Share</h2>
                            <h2 className='text-main text-base sm:text-lg font-bold'>Profit</h2>
                        </div>
                        {adminData?.adminsInfo?.map((admin, i) => {
                            const sharePercent = admin?.investment / adminData?.TotalInvestment
                            const profitAmount = adminData?.TotalProfit * sharePercent
                            return <div className="grid grid-cols-4 gap-10 hover:bg-slate-900 hover:scale-100 transition-all px-10 items-center justify-center" key={i}>
                                <Link to={`/admin-info/${admin._id}`} className='col py-4 font-bold text-base sm:text-lg text-sub hover:text-main'>{admin?.username?.toUpperCase()}</Link>
                                <h1 className='col py-4 font-bold text-base sm:text-lg text-sub'>₹. {admin?.investment}</h1>
                                <h1 className='col py-4 font-bold text-base sm:text-lg text-blue-600'>{(sharePercent * 100)?.toFixed(1)} %</h1>
                                <h1 className='col py-4 font-bold text-base sm:text-lg text-green-600'>₹. {profitAmount?.toFixed(2)}</h1>
                            </div>
                        })}
                    </div>

                    <div className="w-[350px] h-[325px] px-6 pt-6 pb-3 rounded-md border border-gray-700 text-[12px]" data-aos="fade-down-left">
                        {/* <ProfitBarChar adminData={adminData} /> */}
                        <AdminPieChar adminData={adminData} />
                    </div>
                </div>) : (<h1 className='text-red-600 text-3xl font-bold animate-pulse absolute top-60 left-80'>Something went wrong! Try again later!</h1>)}
        </div >
    )
}

export default Profits
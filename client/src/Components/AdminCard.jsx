import React from 'react'

const AdminCard = ({ icon, title, adminData, dataaos, dataaosduration }) => {
    return (
        <div className='col p-3 rounded-md border border-gray-700 flex gap-8 sm:gap-4 items-center' data-aos={dataaos} data-aos-duration={dataaosduration}>
            <div className="">
                {icon}
            </div>
            <div className="">
                <h2 className='text-sm'>{title}</h2>
                {adminData ? <h1 className='text-2xl font-bold text-main mt-1'>₹. {adminData}</h1> : <h1 className='text-2xl font-bold text-main mt-1'>₹. 00</h1>}
            </div>
        </div >
    )
}

export default AdminCard
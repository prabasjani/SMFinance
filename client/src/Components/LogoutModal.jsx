import React from 'react'

const LogoutModal = ({ closeModal, action }) => {
    return (
        <div className="modal">
            <div className="modalOverlay"></div>
            <div className='w-[400px] h-[200px] bg-secondary shadow-lg rounded-md p-8 z-50 flex flex-col justify-center items-center absolute top-52 left-[450px]' data-aos="zoom-in">
                <h2 className='text-sub font-bold text-2xl text-center'>Are you sure want to <span className='text-main'>Logout</span>?</h2>
                <div className="flex items-center gap-5 mt-8">
                    <button className={`font-bold text-main btn rounded-md bg-red-600`} onClick={action}  >Logout </button>
                    <button className='font-bold bg-sub text-secondary btn rounded-md' onClick={closeModal}>cancel</button>
                </div>
            </div>
        </div>
    )
}

export default LogoutModal
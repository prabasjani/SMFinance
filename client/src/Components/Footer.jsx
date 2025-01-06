import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <div className='w-full py-2 bg-secondary flex justify-center'>
            <p className='text-[10px] sm:text-[12px]'>&copy; {year} All Rights Reserved | Design and Developed by &#128156; <span className='text-main font-sans'>PRABANJAN</span></p>
        </div>
    )
}

export default Footer
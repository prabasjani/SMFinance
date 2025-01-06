import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { FinanceContext } from '../Context/AppContext'

const Protectd = () => {
    const { isAuthenticated } = useContext(FinanceContext)
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

export default Protectd
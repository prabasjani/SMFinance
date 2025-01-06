import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useCookies } from "react-cookie";
import useGetToken from '../Hooks/useGetToken'

// Notification toast
import { toast } from 'sonner'

// Context creation
export const FinanceContext = createContext(null)

const AppContextProvider = ({ children }) => {
    // Login 
    const [cookies, _] = useCookies(["access_token"]);
    const [isAuthenticated, setIsAuthenticated] = useState(
        cookies.access_token !== null
    );
    // All Admins Data
    const [adminData, setAdminData] = useState([])
    // Admin Data fetched from Server using axios
    const fetchAdminData = async () => {
        try {
            const res = await axios.get("http://localhost:3000/auth/admin-controls/admins-data")
            setAdminData(res?.data?.data)
        } catch (error) {
            toast.error(error?.message + "! Try again Later!")
        }
    }

    // All Customers Data
    const [customerData, setCustomerData] = useState([])
    // Customer Data fetched from Server using axios
    const fetchCustomerData = async () => {
        try {
            const res = await axios.get("http://localhost:3000/auth/admin-controls/customers-info")
            setCustomerData(res?.data?.data)
        } catch (error) {
            toast.error(error?.message + "! Try again Later!")
        }
    }

    // Current admin data
    const [currAdmin, setCurrAdmin] = useState("")
    const { headers } = useGetToken()
    const fetchCurrAdmin = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/auth/admin-data/${localStorage.getItem("adminID")}`, { headers })
            setCurrAdmin(res?.data?.currentAdmin?.toUpperCase())
        } catch (error) {
            console.log(error?.message + "! Try again Later!")
        }
    }

    // Popup Modal state
    const [modalOpen, setModalOpen] = useState(false)
    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }

    // SuperAdmin access
    const [isSuperAdmin, setIsSuperAdmin] = useState(false)

    useEffect(() => {
        fetchAdminData()
        fetchCustomerData()
        // Only Fetch Current Admin data if Authenticated
        if (isAuthenticated) {
            fetchCurrAdmin();
        }

        if (localStorage.getItem("role") == "SuperAdmin") {
            setIsSuperAdmin(true)
        } else {
            setIsSuperAdmin(false)
        }
    }, [adminData, isAuthenticated])    // When Authentication was changed reload the page

    // Paasing Values to the context
    const contextValue = {
        adminData,
        customerData,
        modalOpen,
        toggleModal,
        currAdmin,
        fetchCurrAdmin,
        isAuthenticated,
        setIsAuthenticated,
        isSuperAdmin
    }
    return (
        <FinanceContext.Provider value={contextValue}>{children}</FinanceContext.Provider>
    )
}

export default AppContextProvider
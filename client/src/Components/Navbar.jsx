import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom"
import { useCookies } from "react-cookie";
import { FinanceContext } from "../Context/AppContext";
import LogoutModal from "./LogoutModal";
import { FaUserShield } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";

const Navbar = () => {
    // const [menu, setMenu] = useState(false)
    const [_, setCookies] = useCookies(["access_token"])
    const { isAuthenticated, setIsAuthenticated, isSuperAdmin } = useContext(FinanceContext)
    const handleLogout = () => {
        localStorage.clear();
        setCookies("access_token", null);
        setIsAuthenticated(false);
        setModalOpen(false)
    };
    const [modalOpen, setModalOpen] = useState(false)
    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }

    return (
        <div className={`px-20 py-3 bg-secondary flex ${isAuthenticated ? 'justify-between' : 'justify-center'} transition-all items-center relative z-50 overflow-hidden`}>
            <Link to='/admin-home' className='text-2xl text-main tracking-widest' data-aos="fade-right"><span className='text-title font-bold'>SM</span> Finance</Link>
            {isAuthenticated && <div className="hidden text-sm sm:flex sm:items-center sm:gap-5 navlinks" data-aos="fade-left">
                <NavLink to="/admin-home" className='relative hover:text-main transition-all delay-100'>Home</NavLink>
                <NavLink to="/all-customers" className='relative hover:text-main transition-all delay-100'>Customers</NavLink>
                <NavLink to="/profits" className='relative hover:text-main transition-all delay-100'>Profits</NavLink>
                {isSuperAdmin && <Link to="/register" className='flex items-center gap-2 text-main btn bg-blue-500 hover:bg-blue-600 rounded-md text-[12px] font-bold'>Add Admin <FaUserShield /></Link>}
                <button className='flex items-center gap-2 text-main btn bg-red-500 hover:bg-red-600 rounded-md text-[12px] font-bold' onClick={toggleModal}>Logout <LuLogOut /></button>
                {/* {menu ? <MdOutlineClose size={30} onClick={() => setMenu(false)} /> : <RiMenu3Fill size={30} color="black" className="sm:hidden" onClick={() => setMenu(true)} />} */}
            </div>}
            {modalOpen && <LogoutModal closeModal={toggleModal} action={handleLogout} />}
        </div>
    )
}

export default Navbar
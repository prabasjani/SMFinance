import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Notification Toast
import { Toaster } from 'sonner'

// Components
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import Protected from "./Components/Protected"
// Pages
import AdminHome from "./Pages/AdminHome"
import AdminInfo from "./Pages/AdminInfo"
import UpdateAdmin from "./Pages/UpdateAdmin"
import AllCustomers from "./Pages/AllCustomers"
import CustomerInfo from "./Pages/CustomerInfo"
import AddCustomer from "./Pages/AddCustomer"
import UpdateCustomer from "./Pages/UpdateCustomer"
import CustomerView from "./Pages/CustomerView"
import Profits from './Pages/Profits'

// Context
import AppContextProvider from './Context/AppContext'
import Register from './Components/Register'

// Animate on Scroll
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {

  useEffect(() => {
    AOS.init({
      once: true,
      easing: "ease-out-cubic",
      duration: 600,
    })
    AOS.refresh();
  }, []);

  return (
    <AppContextProvider>
      <Router>
        <Navbar />
        <Toaster richColors position="top-right" />

        <Routes>
          <Route path='/' element={<CustomerView />} />
          {/* Protected Routes */}
          <Route element={<Protected />}>
            <Route path='/admin-home' element={<AdminHome />} />
            <Route path='/admin-info/:id' element={<AdminInfo />} />
            <Route path='/update-admin/:id' element={<UpdateAdmin />} />
            <Route path='/all-customers' element={<AllCustomers />} />
            <Route path='/customer-info/:id' element={<CustomerInfo />} />
            <Route path='/add-customer' element={<AddCustomer />} />
            <Route path='/update-customer/:id' element={<UpdateCustomer />} />
            <Route path='/profits' element={<Profits />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Routes>

        <Footer />
      </Router>
    </AppContextProvider>
  )
}

export default App
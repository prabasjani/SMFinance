import express from "express"
import { allAdminsData, deleteAdmin, updateAdmin } from "../controllers/adminController.js"
import { addNewCustomer, allCustomersData, deleteCustomer, updateCustomer } from "../controllers/customerController.js"

const routes = express.Router()

// All Admins data
routes.get("/admins-data", allAdminsData)

// Update Admin data
routes.put("/update-admin/:id", updateAdmin)

// Delete Admin data
routes.delete("/delete-admin/:id", deleteAdmin)

// All Customers info
routes.get("/customers-info", allCustomersData)

// Add new customer
routes.post("/add-customer", addNewCustomer)

// Update existing customer
routes.put("/update-customer/:id", updateCustomer)

// Delete existing customer
routes.delete("/delete-customer/:id", deleteCustomer)

export { routes as adminControlRoutes } 
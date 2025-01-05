import { CustomerModel } from "../models/customerModels.js"

export const allCustomersData = async (req, res) => {
    try {
        const customers = await CustomerModel.find({})
        if (customers.length > 0) {
            return res.status(200).json({ status: true, totalCustomers: `Total ${customers.length} Customers`, data: customers })
        }
        res.status(404).json({ status: false, message: "No Customers to get data!" })
    } catch (error) {
        res.status(500).json({ status: true, message: `Something went wrong! try again!! ${error.message}` })
    }
}

export const addNewCustomer = async (req, res) => {
    const { customerName, mobileNumber, aadharNumber, creditAmount, interestRate, creditType, creditStatus } = req.body

    try {
        const customer = await CustomerModel.findOne({ customerName })
        if (customer) {
            return res.status(404).json({ status: false, message: "Customer Already Exists!" })
        }
        const newCustomer = new CustomerModel({ customerName, mobileNumber, aadharNumber, creditAmount, interestRate, creditType, creditStatus })
        await newCustomer.save()

        res.status(201).json({ status: true, message: "New Customer Added Successfully!" })
    } catch (error) {
        res.status(500).json({ status: true, message: `Something went wrong! try again!! ${error.message}` })
    }
}

export const updateCustomer = async (req, res) => {
    const { id } = req.params   // Get the id from the URL params
    const { customerName, mobileNumber, aadharNumber, creditAmount, interestRate, creditType, creditStatus } = req.body

    try {
        const updatedCustomer = await CustomerModel.findByIdAndUpdate(id, { customerName, mobileNumber, aadharNumber, creditAmount, interestRate, creditType, creditStatus }, { new: true })

        res.status(200).json({ status: true, message: `${updatedCustomer.customerName}'s details was updated`, updatedCustomer })
    } catch (error) {
        res.status(500).json({ status: true, message: `Something went wrong! try again!! ${error.message}` })
    }
}

export const deleteCustomer = async (req, res) => {
    const { id } = req.params   // Get the id from the URL params
    try {
        const customer = await CustomerModel.findByIdAndDelete(id)
        if (!customer) {
            return res.status(404).json({ status: false, message: "Invalid Customer ID" })
        }
        res.status(200).json({ status: true, message: `${customer.customerName}'s details was Deleted!` })
    } catch (error) {
        res.status(500).json({ status: true, message: `Something went wrong! try again!! ${error.message}` })
    }
}
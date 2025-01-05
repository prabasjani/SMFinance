import bcrypt from "bcrypt"
import { UserModel } from "../models/authModels.js"
import { CustomerModel } from "../models/customerModels.js"

export const allAdminsData = async (req, res) => {
    try {
        const admins = await UserModel.find({})
        const customers = await CustomerModel.find({})

        if (admins.length > 0) {
            // Calculate the TotalInvestment
            const totalInvestment = admins.reduce((acc, admin) => {
                return acc + admin?.investment
            }, 0)
            // Calculate the TotalProfit
            const totalProfit = customers.reduce((acc, customer) => {
                return acc + (customer.creditAmount * customer.interestRate)
            }, 0)
            // Calculate the TotalCreditAmount
            const totalCreditAmount = customers.reduce((acc, customer) => {
                return acc + customer.creditAmount
            }, 0)
            // Calculate the Balance Investment
            const balanceInvestment = totalInvestment - totalCreditAmount

            return res.status(200).json({ status: true, message: "SM Finance Admins", data: { AdminsCount: `Total ${admins.length} Admins`, TotalInvestment: totalInvestment, TotalProfit: totalProfit, TotalCredit: totalCreditAmount, BalanceInvestment: balanceInvestment, adminsInfo: admins } })
        }
        res.status(404).json({ status: false, message: "Admins Details not found" })
    } catch (error) {
        res.status(500).json({ status: true, message: `Something went wrong! try again! ${error.message}` })
    }
}

export const updateAdmin = async (req, res) => {
    const { id } = req.params   // Get the id from the URL params
    const { username, email, mobile, investment, password } = req.body

    try {
        const hashedPwd = await bcrypt.hash(password, 10)
        const admin = await UserModel.findByIdAndUpdate(id, { username, email, mobile, investment, password: hashedPwd }, { new: true })       // {new: true} is used to update the Admin
        if (!admin) {
            return res.status(404).json({ status: false, message: "Invalid Admin ID" })
        }
        res.status(200).json({ status: true, message: `${admin.username} Admin details was Updated` })
    } catch (error) {
        res.status(500).json({ status: true, message: `Something went wrong! try again!! ${error.message}` })
    }
}

export const deleteAdmin = async (req, res) => {
    const { id } = req.params   // Get the id from the URL params
    try {
        const admin = await UserModel.findByIdAndDelete(id)
        if (!admin) {
            return res.status(404).json({ status: false, message: "Invalid Admin ID" })
        }
        res.status(200).json({ status: true, message: `${admin.username} Admin was Deleted` })
    } catch (error) {
        res.status(500).json({ status: true, message: `Something went wrong! try again!! ${error.message}` })
    }
}
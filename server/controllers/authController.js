import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UserModel } from "../models/authModels.js";

export const registerAdmin = async (req, res) => {
    const { username, email, mobile, investment, password } = req.body;

    try {
        const admin = await UserModel.findOne({ username });
        if (admin) {
            return res.status(400).json({ status: false, message: "Admin Already exists!" });
        }
        // Hashing the password from the user
        const hashedPwd = await bcrypt.hash(password, 10)

        const newAdmin = new UserModel({ username, email, mobile, investment, password: hashedPwd })
        await newAdmin.save()

        res.status(201).json({ status: true, message: "Admin Registeration Success!" })
    } catch (error) {
        res.status(500).json({ status: false, message: `Registeration Failed! ${error.message}` })
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body

    try {
        const admin = await UserModel.findOne({ username })
        if (!admin) {
            return res.status(404).json({ status: false, message: "Admin Not Found!" })
        }
        // Verify the password from the user
        const verifyPwd = await bcrypt.compare(password, admin.password)
        if (!verifyPwd) {
            return res.status(401).json({ status: false, message: "Incorrect Credentials!" })
        }

        // Generate the Access token by using JWT, the payload of admin id
        const accessToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET)

        res.status(200).json({ status: true, message: `Login Success. Welcome ${admin.username?.toUpperCase()}`, token: accessToken, adminID: admin._id, superAdmin: admin.role })  // return the access token and also the admin id
    } catch (error) {
        res.status(500).json({ status: false, message: `Login Failed! ${error.message}` })
    }
}

export const currentAdmin = async (req, res) => {
    const { adminID } = req.params

    try {
        const admin = await UserModel.findById(adminID)
        if (!admin) {
            return res.status(404).json({ status: false, message: "Admin Not Found!" })
        }
        res.status(200).json({ currentAdmin: admin.username })
    } catch (error) {
        res.status(500).json({ status: false, message: `Admin data fetch failed! ${error.message}` })
    }
}
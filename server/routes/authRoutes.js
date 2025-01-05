import express from "express"
import jwt from "jsonwebtoken"
import { currentAdmin, login, registerAdmin } from "../controllers/authController.js";

const routes = express.Router()

// Register New Admin
routes.post("/register", registerAdmin)

// Login Route
routes.post("/login", login)

// Middleware for Verifying the Access token
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;   // set the header for JWT Verify
    if (authHeader) {
        jwt.verify(authHeader, process.env.JWT_SECRET, (err) => {
            if (err) return res.sendStatus(403)
            next()
        })
    } else {
        return res.sendStatus(401)
    }

}

// Getting the Current admin and also pass the Middleware for JWT Verifying
routes.get("/admin-data/:adminID", verifyToken, currentAdmin)

export { routes as authRoutes }
import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv"

import { connectDB } from "./config/connectDB.js"
import { authRoutes } from "./routes/authRoutes.js"
import { adminControlRoutes } from "./routes/adminControlRoutes.js"

configDotenv()

const app = express()
const PORT = process.env.PORT || 3001

// Middlewares
app.use(express.json());
app.use(cors())

// Routes
app.use("/auth", authRoutes)
app.use("/auth/admin-controls", adminControlRoutes)

// Configration
app.listen(PORT, () => {
    console.log(`Server Running on PORT: ${PORT}`)
    connectDB()
})
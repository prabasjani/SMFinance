import mongoose from "mongoose";

const UserShema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    mobile: {
        type: Number,
        require: true
    },
    investment: {
        type: Number,
        require: true
    },
    role: {
        type: String,
        default: "Admin",
        require: false
    },
    password: {
        type: String,
        require: true
    },
}, { timestamps: true })

export const UserModel = mongoose.model("user", UserShema)
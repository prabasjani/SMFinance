import { model, Schema } from "mongoose";

const CustomerSchema = new Schema({
    customerName: {
        type: String,
        require: true,
    },
    mobileNumber: {
        type: Number,
        require: true,
    },
    aadharNumber: {
        type: Number,
        require: true,
    },
    creditAmount: {
        type: Number,
        require: true,
    },
    interestRate: {
        type: Number,
        require: true,
        default: 0.05,
    },
    creditType: {
        type: String,
        require: true,
    },
    creditStatus: {
        type: Number,
        default: 1,
    },
}, { timestamps: true })

export const CustomerModel = model("customer", CustomerSchema)
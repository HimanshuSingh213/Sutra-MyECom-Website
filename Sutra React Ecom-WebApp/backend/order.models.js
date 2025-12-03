import mongoose from 'mongoose';
// const mongoose = require('mongoose');


const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        Ref: "Product"
    },
    qty: {
        type: Number,
        required: true,
    }
})

const shippingSchema = new mongoose.Schema({
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
})

const orderSchema = new mongoose.Schema({
    orderPrice: {
        type: Number,
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        Ref: "User"
    },
    orderItems: [orderItemSchema],
    shippingInfo: [shippingSchema],
    paymentMethod: {
        type: String,
        enum: ["Prepaid", "Cash"],
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Cancelled", "Delivered"],
        default: ["Pending"]
    }
}, {timestamps: true},);


export const Order = mongoose.model('Order', orderSchema );
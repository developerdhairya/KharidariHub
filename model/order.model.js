const { default: mongoose } = require("mongoose");


const addressSchema = mongoose.Schema({
    addressLine1: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    addressLine2: {
        type: String,
        required: false,
        minLength: 3,
        maxLength: 50,
    },
    country: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 30
    },
    zip: {
        type: Number,
        required: true,
        max: 999999,
    }
});

const orderItemSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
})


const order = new mongoose.Schema(
    'order',
    mongoose.Schema({
        orderItems: [orderItemSchema],
        status: {
            type: String,
            required: true,
            default: 'Pending',
        },
        totalPrice: {
            type: Number,
            required: true
        },
        address: addressSchema,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    },
        { timestamp: true }),

);

module.exports = {
    order
}
const { default: mongoose } = require("mongoose");

const cartSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },

}, { timestamp: true });


const cart = new mongoose.Schema(
    'cart',
    mongoose.Schema({
        orderItems: [orderItemSchema],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    },
        { timestamp: true }),

);

module.exports = {
    cart
}
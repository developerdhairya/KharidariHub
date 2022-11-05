const { default: mongoose } = require("mongoose");

const orderItemSchema = mongoose.Schema({
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

    },
        { timestamp: true }),

);

module.exports = {
    cart
}
const mongoose = require('mongoose');

const fields = {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    orderItems: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true,
        }
    }],
    paymentId: {
        type: String,
        required: true,
    },
    paymentUrl:{
        type:String,
        required:true
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'pending'
    }
}

const options = {
    timestamps: true,
    toJSON: {
        transform: function (doc, obj) {
            delete obj.__v;
        },
    },
}

const order = new mongoose.model('order', mongoose.Schema(fields, options));

module.exports = order;
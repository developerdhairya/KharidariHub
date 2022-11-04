const mongoose = require('mongoose');

const product = new mongoose.model(
    "product",
    mongoose.Schema({
        productName: {
            type: String,
            required: true,
            unique:true
        },
        productDescription: {
            type: String,
            required: true
        },
        richDescription: {
            type: String,
            default: ''
        },
        productImages: [{
            type: String,
            required: true
        }],
        brand: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            required: true
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
        },
        rating: {
            type: Number,
            default: 0,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        }
    },
        {
            timestamp: true,
            toJSON: {
                transform: (doc, ret) => {
                    delete ret.__v;
                }
            }
        })
);

module.exports = {
    product
}
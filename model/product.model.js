const mongoose = require('mongoose');

const product = new mongoose.model(
    "product",
    mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        richDescription: {
            type: String,
            default: ''
        },
        images: [{
            type: String
        }],
        brand: {
            type: String,
            default: ''
        },
        price: {
            type: Number,
            default: 0
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
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

        { timestamp: true })
);

module.exports = {
    product
}
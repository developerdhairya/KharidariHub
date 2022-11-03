const mongoose = require('mongoose');

const category = new mongoose.model(
    "category",
    mongoose.Schema({
        categoryName: {
            type: String,
            require: true,
            unique: true,
        },
        categoryDescription: {
            type: String,
            require: false,
        },
        categoryImage: {
            type: String,
            required: false,
        }
    }),
);

module.exports = {
    category
};
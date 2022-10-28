const mongoose = require('mongoose');

const category = new mongoose.model(
    "Category",
    mongoose.Schema({
        categoryName: {
            type: String,
            require: true,
            unique: true,
        },
        categoryDecription: {
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
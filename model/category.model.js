const mongoose = require('mongoose');

/**
 * Categories of products
 * @typedef {object} Category
 * @property {string} categoryName.required - categoryName
 * @property {string} categoryDecription.required - categoryDescription
 * @property {string} categoryImage.required - categoryImage - binary
 */
const category = new mongoose.model(
    "Category",
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
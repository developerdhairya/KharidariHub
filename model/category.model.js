const mongoose = require('mongoose');

const category = new mongoose.model(
    "category",
    mongoose.Schema({
        categoryName: {
            type: String,
            unique: true,
            required: true,
        },
        categoryDescription: {
            type: String,
            required: false,
        },
        categoryImage: {
            type: String,
            required: false,
        }
    },
    {
        timestamp:true,
        toJSON:{
            transform:(doc,ret)=>{
                delete ret.__v;
            }
        }
    }
    ),
);

module.exports = {
    category
};
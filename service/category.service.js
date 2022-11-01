const { category } = require('../model/category.model');
const { MONGO_CONFIG } = require('../configuration/app.config');
const { response } = require('express');

async function createCategory(params, callback) {
    if (!params.categoryName) {
        return callback({
            message: "Category Name Required",
        });
    }
    const model = new category(params);
    model.save().then((response) => {
        return callback(null,response);
    }).catch((err) => {
        console.log(err);
        return callback(err);
    });
}

async function getCategoryByName(params, callback) {
    if (!params.categoryName) {
        return callback({
            message: "Category Name Required",
        });
    }
    const condition={
        categoryName: {
            $regx: new RegExp(params.categoryName),
            $option: "i"
        }
    } 
    const options = {
        sort: {
            categoryName: 0,
        },
        projection: {
            categoryName: 0,
            categoryImage: 0,
        },
        
    };
    let pageSize = Math.abs(params.pageSize) || MONGO_CONFIG.pageSize;
    let pageNumber = Math.abs(params.pageNumber) || 1;

    category.find(condition,options).limit(pageSize).skip(pageSize * (pageNumber - 1)).then((response) => {
        return callback(null, response);
    }).catch((err) => {
        return callback(err);
    });
}

async function getCategoryById(params, callback) {
    if (!params.categoryId) {
        return callback({
            message: "Category Id Required",
        }, "");
    }
    const condition = {
        id: {
            $eq: params.id,
        }
    }
    const options = {
        projection: {
            _id: 0,
            categoryName: 1,
            categoryImage: 1
        }
    }
    category.findOne(condition, options).then((response) => {
        return callback(null, response);
    }).catch((err) => {
        return callback(err);
    });
}

async function updateCategoryById(params, callback) {
    if (!params.categoryId) {
        return callback({
            message: "Category Id Required",
        }, "");
    }
    const condition = {
        categoryId: {
            $eq: params.categoryId,
        }
    }
    const updateParams={...params};
    let upSchema=["categoryName","categoryDescription","categoryImage"];
    for(let key in updateParams){
        if(!upSchema.includes(key) && !updateParams[key]){
            delete updateParams[key];
        }
    }
    const updateDoc = {
        $set: updateParams,
    }
    const options = {
        upsert: false,
    }
    category.updateOne(condition, updateDoc, options).then((response) => {
        return callback(null, response);
    }).catch((err) => {
        return callback(err);
    });
}

async function deleteCategoryById(params, callback) {
    if (!params.categoryId) {
        return callback({
            message: "Category Id Required",
        }, "");
    }
    const condition = {
        categoryId: {
            $eq: params.categoryId,
        }
    }
    category.deleteOne(condition).then((response) => {
        return callback(null, response);
    }).catch((err) => {
        return callback(err);
    });
}

module.exports={
    createCategory,
    getCategoryByName,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
}
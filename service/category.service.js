const { category } = require('../model/category.model');
const { MONGO_CONFIG } = require('../config/config');

// Create New Category
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
        return callback(err);
    });
}

//Get Category By Id
async function getCategoryById(params, callback) {
    if (!params.categoryId) {
        return callback({
            message: "Category Id Required",
        }, "");
    }
    const condition = {
        _id: {
            $eq: params.categoryId,
        }
    }
    const options = {
        projection: {
            _id:0,
            categoryName: 0,
            categoryImage: 0,
        }
    }
    category.findOne(condition,options).then((response) => {
        return callback(null, response);
    }).catch((err) => {
        return callback(err);
    });
}

// Get Category By Name
async function getCategoryByName(params, callback) {
    console.log(5);
    if (!params.categoryName) {
        return callback({
            message: "Category Name Required",
        });
    }
    console.log(7);
    const condition={
        categoryName: {
            $eq:params.categoryName,
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



//Update Category By Name
async function updateCategoryByName(params, callback) {
    if (!params.categoryName) {
        return callback({
            message: "Category Name Required",
        });
    }
    const condition = {
        categoryName: {
            $eq: params.categoryName,
        }
    }
    for(let key in params){
        if(!params['key'] || key==='categoryName'){
            delete key;
        }
    }
    const updateDoc = {
        $set: params,
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

//Delete Category By Id
async function deleteCategoryById(params, callback) {
    if (!params.categoryId) {
        return callback({
            message: "Category Id Required",
        }, "");
    }
    const condition = {
        _id: {
            $eq: params.categoryId,
        }
    }
    category.deleteOne(condition).then((response) => {
        return callback(null, response);
    }).catch((err) => {
        return callback(err);
    });
}

//Delete Category By Name
async function deleteCategoryByName(params, callback) {
    if (!params.categoryName) {
        return callback({
            message: "Category Name Required",
        }, "");
    }
    const condition = {
        categoryId: {
            $eq: params.categoryName,
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
    getCategoryById,
    getCategoryByName,
    updateCategoryByName,
    deleteCategoryById,
    deleteCategoryByName
}
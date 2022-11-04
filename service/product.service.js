const { product } = require('../model/product.model');
const { MONGO_CONFIG } = require('../config/config');


async function createProduct(props, callback) {
    const model = new product({
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        richDescription: req.body.richDescription,
        productImages: req.fileName,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
    });
    model.save().then((response) => {
        return callback(null, response);
    }).catch((err) => {
        return callback(err);
    });
}

async function getProducts(props, callback) {
    let pageSize = Math.abs(props.pageSize) || MONGO_CONFIG.pageSize;
    let pageNumber = Math.abs(props.pageNumber) || 1;
    product.find({}).limit(pageSize).skip(pageSize * (pageNumber - 1)).then((response) => {
        return callback(null, response);
    }).catch((err) => {
        return callback(err);
    });
}

async function getProductById(props, callback) {
    product.findById(props.productId).then((response) => {
        return callback(null, response);
    }).catch((err) => {
        return callback(err);
    });
}


async function getProductByName(props, callback) {
    const condition = {
        productName: {
            $eq: props.productName,
        }
    }
    product.findOne(condition).then((response) => {
        return callback(null, response);
    }).catch((err) => {
        return callback(err);
    });
}





async function updateProductByName(props, callback) {
    const condition = {
        productName: {
            $eq: props.productName,
        }
    }
    const updateDoc = {
        $set: {
            productDescription: req.body.productDescription,
            richDescription: req.body.richDescription,
            productImages: req.fileName,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock,
            rating: req.body.rating,
            isFeatured: req.body.isFeatured,
        },
    }
    const options = {
        upsert: false,
    }
    product.updateOne(condition, updateDoc, options).then((response) => {
        return callback(null, response);
    }).catch((err) => {
        return callback(err);
    });
}


async function deleteProductById(props, callback) {
    const condition = {
        _id: {
            $eq: props.productId,
        }
    }
    product.deleteOne(condition).then((response) => {
        return callback(null, response);
    }).catch((err) => {
        return callback(err);
    });
}


async function deleteProductByName(props, callback) {
    const condition = {
        productId: {
            $eq: props.productName,
        }
    }
    product.deleteOne(condition).then((response) => {
        return callback(null, response);
    }).catch((err) => {
        return callback(err);
    });
}

module.exports = {
    createProduct,
    getProductById,
    getProductByName,
    getProducts,
    updateProductByName,
    deleteProductById,
    deleteProductByName
}
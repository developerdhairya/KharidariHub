const productService = require('../service/product.service.js');
const { getResponseCallback } = require('../util/response.callback');


const createProduct = (req, res, next) => {
    let callback=getResponseCallback(req,res,next);
    if(!req.user.isAdmin) return callback(403,{message:"Unauthorized to perform the desired action"});
    let props = {
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        richDescription: req.body.richDescription,
        productImages: req.fileName,
        brand: req.body.brand,
        price: req.body.price,
        categoryId: req.body.categoryId,
        stock: req.body.stock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
        user:req.user,
    }
    
    productService.createProduct(props, callback);
}

const getProductByName = (req, res, next) => {
    let props = {
        productName: req.params.productName,
    }
    let callback = getResponseCallback(req, res, next);
    productService.getProductByName(props, callback);
}

const getProducts = (req, res, next) => {
    let props = {
        pageSize: req.query.pageSize,
        pageNumber: req.query.pageNumber
    }
    let callback = getResponseCallback(req, res, next);
    productService.getProducts(props, callback);
}


const getProductById = (req, res, next) => {
    let props = {
        productId: req.params.productId
    }
    let callback = getResponseCallback(req, res, next);
    productService.getProductById(props, callback);
}

const updateProductByName = (req, res, next) => {
    let props = {
        productName: req.params.productName,
        productDescription: req.body.productDescription,
        richDescription: req.body.richDescription,
        productImages: req.fileName,
        brand: req.body.brand,
        price: req.body.price,
        categoryId: req.body.categoryId,
        stock: req.body.stock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
        user:req.user
    }
    let callback = getResponseCallback(req, res, next);
    productService.updateProductByName(props, callback);
}

const deleteProductById = (req, res, next) => {
    let props = {
        productId: req.params.productId,
        user:req.user
    }
    let callback = getResponseCallback(req, res, next);
    productService.deleteProductById(props, callback);
}

const deleteProductByName = (req, res, next) => {
    let props = {
        productName: req.params.productName,
        user:req.user
    }
    let callback = getResponseCallback(req, res, next);
    productService.deleteProductByName(props, callback);
}

module.exports = {
    createProduct,
    getProducts,
    getProductByName,
    getProductById,
    updateProductByName,
    deleteProductById,
    deleteProductByName,
}
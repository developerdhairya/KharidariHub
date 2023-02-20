const productService = require('../service/product.service.js');
const { getResponseCallback } = require('../util/response.callback');


const createProduct = (req, res, next) => {
    let callback=getResponseCallback(req,res,next);
    if(!req.user.isAdmin) return callback(403,{message:"Unauthorized to perform the desired action"});
    let props = {
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        richDescription: req.body.richDescription,
        productImages: req.files,
        brand: req.body.brand,
        price: req.body.price,
        categoryId: req.body.categoryId,
        stock: req.body.stock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured
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



const getProductById = (req, res, next) => {
    let props = {
        productId: req.params.productId
    }
    let callback = getResponseCallback(req, res, next);
    productService.getProductById(props, callback);
}

const updateProductById = (req, res, next) => {
    let callback=getResponseCallback(req,res,next);
    if(!req.user.isAdmin) return callback(403,{message:"Unauthorized to perform the desired action"});
    let props = {
        productId:req.params.productId,
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        richDescription: req.body.richDescription,
        productImages: req.files,
        brand: req.body.brand,
        price: req.body.price,
        categoryId: req.body.categoryId,
        stock: req.body.stock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
    }
    productService.updateProductById(props, callback);
}

const deleteProductById = (req, res, next) => {
    let callback=getResponseCallback(req,res,next);
    if(!req.user.isAdmin) return callback(403,{message:"Unauthorized to perform the desired action"});
    let props = {
        productId: req.params.productId,
    }
    productService.deleteProductById(props, callback);
}

const deleteProductByName = (req, res, next) => {
    let callback=getResponseCallback(req,res,next);
    if(!req.user.isAdmin) return callback(403,{message:"Unauthorized to perform the desired action"});
    let props = {
        productName: req.params.productName,
    }
    productService.deleteProductByName(props, callback);
}

const getAllProducts = (req, res, next) => {
    let props = {
        pageSize: req.query.pageSize,
        pageNumber: req.query.pageNumber,
        sort:req.query.sort??-1,
    }
    let callback = getResponseCallback(req, res, next);
    productService.getAllProducts(props, callback);
}


module.exports = {
    createProduct,
    getAllProducts,
    getProductByName,
    getProductById,
    updateProductById,
    deleteProductById,
    deleteProductByName,
}
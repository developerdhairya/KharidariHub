const cartService=require('../service/cart.service');
const { getResponseCallback } = require('../util/response.callback');


const addToCart=(req,res,next)=>{
    const callback=getResponseCallback(req,res,next);
    if (!req.body.productId || !req.body.quantity) return callback(400,"productId and quantity are required");
    const params={
        productId:req.body.productId,
        quantity:req.body.quantity,
        user:req.user
    }
    cartService.addToCart(params,callback);
}

const deductFromCart=(req,res,next)=>{
    const callback=getResponseCallback(req,res,next);
    if (!req.body.productId) return callback(400,"productId is required");
    const params={
        productId:req.body.productId,
        user:req.user
    }
    cartService.deductFromCart(params,callback);
}

const getCart=(req,res,next)=>{
    const callback=getResponseCallback(req,res,next);
    const params={
        user:req.user
    }
    cartService.getCart(params,callback);
}

module.exports={
    addToCart,
    deductFromCart,
    getCart
}
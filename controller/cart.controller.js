const cartService=require('../service/cart.service');
const { getResponseCallback } = require('../util/response.callback');


const addToCart=(req,res,next)=>{
    const params={
        productId:req.body.productId,
        quantity:req.body.quantity,
        user:req.user
    }
    const callback=getResponseCallback(req,res,next);
    cartService.addToCart(params,callback);
}

const deductFromCart=(req,res,next)=>{
    const params={
        productId:req.body.productId,
        user:req.user
    }
    const callback=getResponseCallback(req,res,next);
    cartService.deductFromCart(params,callback);
}

const getCart=(req,res,next)=>{
    const params={
        user:req.user
    }
    const callback=getResponseCallback(req,res,next);
    cartService.getCart(params,callback);
}

module.exports={
    addToCart,
    deductFromCart,
    getCart
}
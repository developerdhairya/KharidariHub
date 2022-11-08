const { getResponseCallback } = require('../util/response.callback');
const orderService=require('../service/order.service');

const createOrder=(req,res,next)=>{
    const params={
        user:req.user
    };
    const callback=getResponseCallback(req,res,next);
    orderService.createOrder(params,callback);
}

module.exports={
    createOrder
}
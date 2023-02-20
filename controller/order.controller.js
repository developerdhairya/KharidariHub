const { getResponseCallback } = require('../util/response.callback');
const orderService=require('../service/order.service');

const createOrder=(req,res,next)=>{
    const params={
        user:req.user
    };
    const callback=getResponseCallback(req,res,next);
    orderService.createOrder(params,callback);
}

const verifyPayment=(req,res,next)=>{
    const params={
        paymentId:req.params.paymentId
    };
    const callback=getResponseCallback(req,res,next);
    orderService.verifyPayment(params,callback);
}

const getMyOrders=(req,res,next)=>{
    const params={
        user:req.user,
        pageNumber:req.query.pagenumber,
        pageSize:req.query.pageSize,
        sort:req.query.sort
    };
    const callback=getResponseCallback(req,res,next);
    orderService.getMyOrders(params,callback);
}


module.exports={
    createOrder,
    verifyPayment,
    getMyOrders
}
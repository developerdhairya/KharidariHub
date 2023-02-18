const mongoose = require('mongoose');
const cart=require('../model/cart.model');
const order = require('../model/order.model');
const paymentService=require('./payment.service');

async function createOrder(props, callback) {
  const session=await mongoose.startSession();
  try {
    const condition={userId: props.user.userId};
    let cartObj=await cart.findOne(condition);
    if(cartObj.orderItems.length===0) throw 'Inva';
    cartObj=cartObj.toJSON();                                                        // will never return null as cart is created at time of user creation
    const {paymentId,paymentUrl}=await paymentService.createPaymentLink(cartObj.checkoutPrice,props.user.emailId);
    cartObj.paymentId=paymentId;
    cartObj.paymentUrl=paymentUrl;
    session.startTransaction();
    const orderModel=new order(cartObj);
    const orderObj=await orderModel.save();
    cart.updateOne(condition,{$set:{orderItems:[]}});
    await session.commitTransaction();
    return callback(null, orderObj);
  } catch (err) {
    session.abortTransaction();
    return callback(err);
  }finally{
    session.endSession();
  }
}

async function verifyPayment(props,callback){
  try{
    let orderObj=await order.findById(props.orderId);
    if(orderObj.userId!==props.user.userId) throw 'Unauthorized';
    let response=await paymentService.verifyPayment(orderObj.paymentId);
    return callback(null,response);
  }catch(err){
    return callback(err);
  }
}

//get all orders
//write docs
//make images available



module.exports={
  createOrder
}
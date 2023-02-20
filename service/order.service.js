const mongoose = require('mongoose');
const cart=require('../model/cart.model');
const order = require('../model/order.model');
const paymentService=require('./payment.service');

async function createOrder(props, callback) {
  const session=await mongoose.startSession();
  try {
    const condition={userId: props.user.userId};
    session.startTransaction();
    let cartObj=await cart.findOne(condition);    // cart created at time of user registration
    if(cartObj.orderItems.length===0) return callback(400,{message:"Empty cart"});
    cartObj=cartObj.toJSON();                                                        
    const {paymentId,paymentUrl}=await paymentService.createPaymentLink(cartObj.checkoutPrice,props.user.emailId);
    cartObj.paymentId=paymentId;
    cartObj.paymentUrl=paymentUrl;
    const orderModel=new order(cartObj);
    const orderObj=await orderModel.save();
    await cart.findOneAndUpdate(condition,{$set:{orderItems:[]}},{new:true});
    await session.commitTransaction();
    return callback(201, orderObj);
  } catch (err) {
    session.abortTransaction();
    return callback(null,null,err);
  }finally{
    session.endSession();
  }
}

async function verifyPayment(props,callback){
  try{
    let orderObj=await order.findOne({paymentId:props.paymentId});
    if(!orderObj || orderObj==null) return callback(400,{message:"Invalid Payment Link"});;
    let paymentObj=await paymentService.verifyPayment(props.paymentId);
    console.log(paymentObj);
    if(paymentObj.payments.status==='captured'){
      await order.updateOne({paymentId:props.paymentId},{$set:{paymentStatus:true}});
    }
    return callback(200,paymentObj);
  }catch(err){
    console.log(err);
    return callback(null,null,err);
  }
}

async function getMyOrders(props,callback){
  const pageNumber=Math.abs(props.pageSize) || 1;
  const pageSize=Math.abs(props.pageNumber) || 10;
  const sort=props.sort<=0?-1:1;
  try{
    const orderObj=await order.find({userId:props.user.userId}).limit(pageNumber).skip(pageSize*(pageNumber-1)).sort({createdAt:sort}).populate('orderItems.productId');
    return callback(200,orderObj);

  }catch(err){
    return callback(null,null,err);
}

}



module.exports={
  createOrder,
  verifyPayment,
  getMyOrders
}
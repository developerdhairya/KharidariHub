const cart=require('../model/cart.model');
const order = require('../model/order.model');
const paymentService=require('./payment.service');

async function createOrder(props, callback) {
  try {
    if (!props.userId) throw 'userId required';
    const condition={userId: props.userId};
    const cartObj=await cart.findOne(condition);// will never return null as cart is created at time of user creation
    const paymentObj=await paymentService.createPaymentLink(amount);
    const orderObj={...cartObj};
    orderObj.paymentId=paymentObj.paymentId;
    orderObj.paymentUrl=paymentObj.paymentUrl;
    const orderModel=new order(orderObj);
    const response=order.save();
    return callback(null, response);
  } catch (err) {
    return callback(err);
  }
}


const cart=require('../model/cart.model');
const order = require('../model/order.model');
const paymentService=require('./payment.service');

async function createOrder(props, callback) {
  try {
    const condition={userId: props.user.userId};
    let cartObj=await cart.findOne(condition);// will never return null as cart is created at time of user creation
    const paymentObj=await paymentService.createPaymentLink(cartObj.checkoutPrice,props.user.emailId);
    cartObj=cartObj.toJSON();
    cartObj.paymentId=paymentObj.paymentId;
    cartObj.paymentUrl=paymentObj.paymentUrl;
    const orderModel=new order(cartObj);
    const response=orderModel.save();
    //truncate cart
    return callback(null, response);
  } catch (err) {
    console.log(err);
    return callback(err);
  }
}

async function verifyPayment(props,callback){
  try{
    let orderObj=await order.findById(props.orderId);
    if(orderObj.userId!==props.user.userId) throw 'Unauthorized';
    console.log(await paymentService.verifyPayment(orderObj.paymentId));


  }catch{

  }
}

//get all orders
//write docs



module.exports={
  createOrder
}
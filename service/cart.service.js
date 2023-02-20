const cart = require('../model/cart.model');
const product = require('../model/product.model');
const ObjectId = require('mongoose').Types.ObjectId;

async function addToCart(props, callback) {
  try {

    const condition = {userId: new ObjectId(props.user.userId)};
    const cartObj = await cart.findOne(condition);// will never return null as cart is created at time of user creation
    let checkoutPrice = cartObj.checkoutPrice; 
    const productObj = await product.findById(props.productId).select('price');
    if(!productObj) return callback(400,{message:"invalid productId"});
    const productPrice=productObj.price;

    let isPresent = false;
    for (let item of cartObj.orderItems) {
      if (item.productId._id == props.productId) {
        item.quantity += props.quantity;
        item.price+=productPrice * props.quantity;
        checkoutPrice += productPrice * props.quantity;
        isPresent = true;
        break;
      }
    }
    if (!isPresent) {
      cartObj.orderItems.push({
        productId: props.productId,
        quantity: props.quantity,
        price:productPrice*props.quantity
      });
      checkoutPrice=productPrice * props.quantity;
    }
    const updateDoc = {
      $set: {
        orderItems: cartObj.orderItems,
        checkoutPrice:checkoutPrice
      },
    };
    let updatedcartObj=await cart.findOneAndUpdate(condition, updateDoc,{upsert:false,new:true});
    return callback(201, updatedcartObj);
  } catch (err) {
    return callback(null,null,err);
  }
}


async function deductFromCart(props, callback) {
  try {
    const condition = {userId: new ObjectId(props.user.userId)};
    const cartObj = await cart.findOne(condition);                // will never return null as cart is created at time of user creation
    let checkoutPrice = cartObj.checkoutPrice; 
    const productObj = await product.findById(props.productId);
    if(!productObj) return callback(400,{message:"invalid productId"});
    const productPrice=productObj.price;

    let isPresent = false;
    for (let item of cartObj.orderItems) {
      if (item.productId._id == props.productId) {
        item.quantity -= 1;
        checkoutPrice -= productPrice;
        item.price-=productPrice;
        if(item.quantity===0){
          cartObj.orderItems.splice(cartObj.orderItems.indexOf(item), 1);
        }
        isPresent = true;
        break;
      }
    }
    if (!isPresent) {
      return callback(400,"Item is not present in cart");
    }
    const updateDoc = {
      $set: {
        orderItems: cartObj.orderItems,
        checkoutPrice:checkoutPrice
      },
    };
    let updatedcartObj=await cart.findOneAndUpdate(condition, updateDoc,{upsert:false,new:true});
    return callback(201, updatedcartObj);
  } catch (err) {
    return callback(null,null,err);
  }
}

async function getCart(props, callback) {
  try {
    cart.findOne({userId: props.user.userId}).populate('orderItems.productId').exec((err,data)=>{
      if(err) throw err;
      return callback(200,data);
    });
    
  } catch (err) {
    return callback(null,null,err);
  }
}


module.exports = {
  addToCart,
  deductFromCart,
  getCart,
};

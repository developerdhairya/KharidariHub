const cart = require('../model/cart.model');
const product = require('../model/product.model');
const ObjectId = require('mongoose').Types.ObjectId;

async function addToCart(props, callback) {
  try {
    if (!props.productId || !props.quantity) throw 'productId and quantity required';

    const condition = {userId: new ObjectId(props.user.userId)};
    const cartObj = await cart.findOne(condition);// will never return null as cart is created at time of user creation
    let checkoutPrice = cartObj.checkoutPrice; 
    const productObj = await product.findById(props.productId).select('price');
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
    const updatedCartObj = await cart.updateOne(condition, updateDoc);
    return callback(null, updatedCartObj);
  } catch (err) {
    return callback(err);
  }
}


async function deductFromCart(props, callback) {
  try {
    if (!props.productId) throw 'productId required';
    const condition = {userId: new ObjectId(props.user.userId)};
    const cartObj = await cart.findOne(condition);                // will never return null as cart is created at time of user creation
    let checkoutPrice = cartObj.checkoutPrice; 
    const productObj = await product.findById(props.productId).select('price');
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
      throw 'Item not Present';
    }
    const updateDoc = {
      $set: {
        orderItems: cartObj.orderItems,
        checkoutPrice:checkoutPrice
      },
    };
    const updatedCartObj = await cart.updateOne(condition, updateDoc);
    return callback(null, updatedCartObj);
  } catch (err) {
    return callback(err);
  }
}

async function getCart(props, callback) {
  try {
    if (!props.user.userId) throw 'userId required';
    cart.findOne({userId: props.user.userId}).populate('orderItems.productId').exec((err,res)=>{
      console.log(res);
      if(err) throw err;
      return callback(null,res);
    });
    
  } catch (err) {
    return callback(err);
  }
}


module.exports = {
  addToCart,
  deductFromCart,
  getCart,
};

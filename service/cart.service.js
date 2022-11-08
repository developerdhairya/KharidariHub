const cart = require('../model/cart.model');


async function addToCart(props, callback) {
  try {
    if (!props.userId) throw 'userId required';
    if (!props.productId) throw 'userId required';
    const condition={userId: props.userId};
    const productPrice=await product.findById(props.productId).select('price');
    const cartObj=await cart.findOne(condition);// will never return null as cart is created at time of user creation
    const isPresent=false;
    for (const obj of cartObj.orderItems) {
      if (obj.productId===props.productId) {
        obj.quantity+=1;
        obj.price+=productPrice;
        isPresent=true;
        break;
      }
    }
    if (!isPresent) {
      cartObj.push({
        productId: props.productId,
        quantity: 1,
        totalPrice: obj.productPrice,
      });
    }
    const updateDoc={
      $set: {
        orderItems: cartObj.orderItems,
      },
    };
    const updatedCartObj=await cart.updateOne(condition, updateDoc);
    callback(updatedCartObj);
  } catch (err) {
    callback(err);
  }
}

async function removeFromCart(props, callback) {
  try {
    if (!props.userId) throw 'userId required';
    if (!props.productId) throw 'userId required';
    const condition={userId: props.userId};
    const productPrice=await product.findById(props.productId).select('price');
    const cartObj=await cart.findOne(condition);// will never return null as cart is created at time of user creation
    const isPresent=false;
    for (const obj of cartObj.orderItems) {
      if (obj.productId===props.productId) {
        obj.quantity-=1;
        obj.price-=productPrice;
        if (obj.quantity==0) {
          delete cartObj.orderItems.obj;
        }
        isPresent=true;
        break;
      }
    }
    if (!isPresent) {
      throw 'Item not Present';
    }
    const updateDoc={
      $set: {
        orderItems: cartObj.orderItems,
      },
    };
    const updatedCartObj=await cart.updateOne(condition, updateDoc);
    return callback(updatedCartObj);
  } catch (err) {
    return callback(err);
  }
}

async function getCart(props, callback) {
  try {
    if (!props.userId) throw 'userId required';
    const cartObj=cart.findOne({userId: props.userId}).populate({
      path: 'orderItems',
      populate: {
        path: 'productId',
        model: 'product',
        select: 'productName productImage price',
        populate: {
          path: 'categoryId',
          model: 'category',
          select: 'categoryName',
        },
      },
    });
    return callback(cartObj);
  } catch (err) {
    return callback(err);
  }
}



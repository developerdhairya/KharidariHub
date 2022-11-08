const mongoose = require('mongoose');

const fields={
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true,
  },
  orderItems:[{
    productId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'product',
      required:true,
    },
    quantity:{
      type:Number,
      required:true
    },
    price:{
      type:Number,
      required:true
    }
  }],
  checkoutPrice:{
    type:Number,
    required:true
  }
}

const options={
  timestamps: true,
  toJSON: {
    transform: function(doc, obj){
      delete obj.__v;
      delete obj._id;
    },
  },
}

const cart = new mongoose.model('cart',mongoose.Schema(fields,options));

module.exports = cart;
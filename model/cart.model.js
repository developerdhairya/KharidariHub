const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  }, {
  timestamp: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
    },
  },
},
);

const cart = new mongoose.model(
  'cart',
  mongoose.Schema({
    orderItems: [orderItemSchema],
  }, {
    timestamp: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
      },
    },
  },
  ),

);

module.exports = {
  cart,
};

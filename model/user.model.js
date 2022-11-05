const mongoose = require('mongoose');
const cart = require('./cart.model');

const user = new mongoose.model(
  'user',
  mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
    },
    hashedPassword: {
      type: String,
      // required:true
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (val) => {
          '/^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/g'.match(val);
        },
        message: (props) => {
          `${props.val} is not a valid emailId`;
        },
      },
    },
    mobileNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: Number,
    },
    passwordResetToken: {
      type: String,
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'cart',
    },
  },
    {
      timestamps: true,
      toJSON: {
        transform: function(doc, obj){
          delete obj.__v;
          delete obj.hashedPassword;
        },
      },
    },

  ),
);

module.exports = {
  user,
};

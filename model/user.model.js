const mongoose = require('mongoose');
const cart = require('./cart.model');

let fields={
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
    required:true
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
  isAdmin:{
    type:Boolean,
    default:false,
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
  address:{
    addressLine1: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    addressLine2: {
      type: String,
      required: false,
      minLength: 3,
      maxLength: 50,
    },
    country: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 30,
    },
    zip: {
      type: Number,
      required: true,
      max: 999999,
    },
  },
}

let options={
  timestamps: true,
  toJSON: {
    transform: function(doc, obj){
      delete obj.__v;
      delete obj.hashedPassword;
    },
  },
}

const user = new mongoose.model('user',mongoose.Schema(fields,options));

module.exports = user;

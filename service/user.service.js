const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const mailingService = require('./mailing.service');
const user = require('../model/user.model');
const cart = require('../model/cart.model');
const jwt=require('jsonwebtoken');

async function registerUser(props, callback) {
  if (props.password && !props.password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}/g)) {
    return callback({
      message: 'Strong password required',
    });
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(props.password, salt);// generating hash syncronously
  const verificationToken = Math.floor(Math.random() * 10000);
  const session = await mongoose.startSession();
  try {
    session.startTransaction(); // do not return a promise
    const userModel = new user({
      firstName: props.firstName,
      lastName: props.lastName,
      emailId: props.emailId,
      mobileNumber: props.mobileNumber,
      hashedPassword: hashedPassword,
      verificationToken: verificationToken,
      address:props.address
    });
    const userObj = await userModel.save();
    const cartModel = new cart({userId:userObj._id,checkoutPrice:0});
    await cartModel.save();
    await session.commitTransaction();
    mailingService.sendVerificationToken(props.emailId, verificationToken); //async op
    return callback(null, {
      userData: userObj,
      message: 'Verification Required.Kindly check your mail',
    });
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    return callback(err);
  } finally {
    session.endSession();
  }
}


async function resendVerificationToken(props, callback) {
  const condition = {
    emailId: {
      $eq: props.emailId,
    },
  };
  try {
    const userObj = await user.findOne(condition);
    if (userObj == null || !userObj) throw 'Invalid Account';
    if (userObj.verified) throw 'User has already been verified';
    mailingService.sendVerificationToken(props.emailId, userObj.verificationToken);
    return callback(null, {acknowledged: true});
  } catch (err) {
    return callback(err);
  }
}

async function verifyUser(props, callback) {
  const condition = {
    emailId: {
      $eq: props.emailId,
    },
  };
  const updateDoc = {
    $set: {
      verified: true,
    },
  };
  try {
    const userObj = await user.findOne(condition);
    if (userObj == null || !userObj) throw 'Invalid Account';
    if (userObj.verified) throw 'User has already been verified';
    if (userObj.verificationToken !== props.verificationToken) throw 'Invalid OTP';
    await user.updateOne(condition, updateDoc);
    return callback(null, {verified: true});
  } catch (err) {
    return callback(err);
  }
}

async function login(props, callback) {
  if (!props.emailId || !props.password) {
    return callback({message: 'emailId and password required'});
  }
  try {
    if (!props.emailId) throw 'Email Id required';
    const userObj = await user.findOne({emailId: props.emailId});
    if (!userObj || userObj == null) throw 'User Not Found';
    if (!userObj.verified) throw 'User Not Verified';
    if(!bcrypt.compareSync(props.password,userObj.hashedPassword)){
      throw 'Invalid Password';
    }
    const payload = {
      userId:userObj._id,
      emailId: props.emailId,
      isAdmin: userObj.isAdmin,
    };
    console.log(payload);
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET,{
      expiresIn:'90d'
    });
    return callback(null, {accessToken: accessToken, refreshToken: refreshToken});
  } catch (err) {
    return callback(err);
  }
}

async function generateAccessToken(props, callback) {
  if (!props.refreshToken || props.refreshToken === null) {
    callback({message: 'Refresh Token Required'});
  }
  jwt.verify(props.refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return callback({message: 'Invalid Token'});
    }
    delete payload['iat'];
    delete payload['exp'];
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{
      expiresIn:'1h'
    });
    return callback(null, {accessToken: accessToken});
  });
}


module.exports = {
  registerUser,
  verifyUser,
  resendVerificationToken,
  login, generateAccessToken,
};

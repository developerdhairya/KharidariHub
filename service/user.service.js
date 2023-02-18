const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const mailingService = require('./mailing.service');
const user = require('../model/user.model');
const cart = require('../model/cart.model');
const jwt=require('jsonwebtoken');

async function registerUser(props, callback) {
  
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
    const cartModel = new cart({
      userId:userObj._id,
      checkoutPrice:0
    });
    await cartModel.save();
    await session.commitTransaction();
    mailingService.sendVerificationToken(props.emailId, verificationToken); //async op
    return callback(201, {
      userData: userObj,
      message: 'Verification Required.Kindly check your mail',
    });
  } catch (err) {
    await session.abortTransaction();
    return callback(null,null,err);
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
    if (userObj == null || !userObj) return callback(400,{message:"Invalid Email Id"});
    if (userObj.verified) return callback(404,{message:"User has already been verified"});
    mailingService.sendVerificationToken(props.emailId, userObj.verificationToken);
    return callback(202, {acknowledged: true});
  } catch (err) {
    return callback(null,null,err);
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
    if (userObj == null || !userObj) return callback(404,{message:"Invalid User"});
    if (userObj.verified) return callback(400,{message:'User has already been verified'});
    if (userObj.verificationToken !== props.verificationToken) return callback(400,{message:'Invalid Verification Code'});
    await user.updateOne(condition, updateDoc);
    return callback(200, {verified: true});
  } catch (err) {
    return callback(null,null,err);
  }
}

async function login(props, callback) {
  
  try {
    const userObj = await user.findOne({emailId: props.emailId});
    if (!userObj) return callback(400,{message:"Invalid emailId"});
    console.log(userObj.verified);
    if (!userObj.verified) return callback(404,{message:'User has not been verified'});
    if(!bcrypt.compareSync(props.password,userObj.hashedPassword)) return callback(401,{message:'Invalid Password'});
    const payload = {
      userId:userObj._id,
      emailId: props.emailId,
      isAdmin: userObj.isAdmin,
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{
      expiresIn:'1h'
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET,{
      expiresIn:'90d'
    });
    return callback(200, {accessToken: accessToken, refreshToken: refreshToken});
  } catch (err) {
    return callback(null,null,err);
  }
}

async function generateAccessToken(props, callback) {
  if (!props.refreshToken || props.refreshToken === null) {
    callback(400,{message: 'Refresh Token Required'});
  }
  jwt.verify(props.refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return callback(400,{message: 'Invalid Token'});
    }
    delete payload['iat'];
    delete payload['exp'];
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{
      expiresIn:'1h'
    });

    return callback(200, {accessToken: accessToken});
  });
}


module.exports = {
  registerUser,
  verifyUser,
  resendVerificationToken,
  login, generateAccessToken,
};

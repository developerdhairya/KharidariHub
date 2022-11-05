const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const { user } = require('../model/user.model');
const { cart } = require('../model/cart.model');
const queueMail = require('../util/mailer')

async function registerUser(props, callback) {
    if (props.password && !props.password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}/g)) {
        return callback({
            message: "Strong password required",
        });
    }
    const salt=bcrypt.genSaltSync(10);
    const hashedPassword=bcrypt.hashSync(props.password,salt);// generating hash syncronously
    const verificationToken = Math.floor(Math.random() * 10000);


    //creating user
    let userObj;
    const session = await mongoose.startSession();
    try {
        session.startTransaction(); //do not return a promise
        const cartModel = new cart({});
        const cartObj = await cartModel.save();
        const userModel = new user({
            firstName: props.firstName,
            lastName: props.lastName,
            emailId: props.emailId,
            mobileNumber: props.mobileNumber,
            hashedPassword: hashedPassword,
            verificaionToken: verificationToken,
            cartId: cartObj._id
        });
        userObj = await userModel.save();
        await session.commitTransaction();
    } catch (err) {
        await session.abortTransaction();
        return callback(err);
    } finally {
        session.endSession();
    }
    queueMail({
        emailId: props.emailId,
        subject: "Welcome to Kharidari Hub",
        body: `Thanks for testing my project.Your otp for email verification is ${verificationToken}`
    });
    return callback(null, {
        userData: userObj,
        message: "Verification Required.Kindly check your mail"
    });
}

//resend the same verification token
async function resendVerificationToken(props, callback) {
    const condition = {
        emailId: {
            $eq: props.emailId
        }
    }
    let verificationToken;
    try {
        const userObj = await user.findOne(condition);
        if (userObj == null || !userObj) throw 'Invalid Account';
        if (userObj.verified) throw 'User has already been verified';
        verificationToken = userObj.verificaionToken;
    } catch (err) {
        return callback(err);
    }
    queueMail({
        emailId: props.emailId,
        subject: "Welcome to Kharidari Hub",
        body: `Thanks for testing my project.Your otp for email verification is ${verificationToken}`
    });
    return callback(null, { acknowledged: true});
}

async function verifyUser(props, callback) {
    const condition = {
        emailId: {
            $eq: props.emailId
        }
    }
    const updateDoc = {
        $set: {
            verified: true
        }
    }
    try {
        const userObj = await user.findOne(condition);
        if (userObj == null || !userObj) throw 'Invalid Account';
        if (userObj.verified) throw 'User has already been verified';
        if(userObj.otp !== props.otp) throw 'Invalid otp';
        await user.updateOne(condition,updateDoc);
        return callback(null,{verified:true});
    } catch (err) {
        return callback(err);
    }
}








module.exports = {
    registerUser,
    verifyUser,
    resendVerificationToken
}
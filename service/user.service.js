const mongoose = require('mongoose');
const { user } = require('../model/user.model');
const { cart } = require('../model/cart.model');
const mailTo = require('../util/mailer')

async function createUser(props, callback) {
    if (props.password && !props.password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}/g)) {
        return callback({
            message: "Strong password required",
        });
    }
    const otp = Math.floor(Math.random() * 10000);
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
            hashedPassword: props.password,
            otp: otp,
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
    mailTo({
        emailId: props.emailId,
        subject: "Welcome to Kharidari Hub",
        body: `Thanks for testing my project.Your otp for email verification is ${otp}`
    });
    return callback(null, {userObj:userObj,message:"Verification Required"});
}

async function resendVerificationOtp(props, callback) {
    const condition = {
        emailId: {
            $eq: props.emailId
        }
    }
    let userObj;

    try{
        userObj= await user.findOne(condition);
    }catch(err){
        callback(err);
    }

    if (userObj == null) {
        return callback({
            message: "Invalid Account",
        })
    }
    if (userObj.verified) {
        return callback({
            message: "User has already been verified",
        })
    }

    //sending email asyncronously to reduce response time
    mailTo({
        emailId: props.emailId,
        subject: "Welcome to Kharidari Hub",
        body: `Thanks for testing my project.Your new otp for email verification is ${otp}`
    });

    return callback(null, { acknowledged: true, });


}

async function forgotPassword(props, callback) {
    const condition = {
        emailId: {
            $eq: props.emailId
        }
    }
    let userObj = await user.findOne(condition);
    if (userObj == null) {
        return callback({
            message: "Invalid Account",
        })
    }

    //sending email asyncronously to reduce response time
    mailTo({
        emailId: props.emailId,
        subject: "Welcome to Kharidari Hub",
        body: `Thanks for testing my project.Your can reset your`
    });

    return callback(null, { acknowledged: true, })


}


async function verifyUser(props, callback) {
    const condition = {
        emailId: {
            $eq: props.emailId
        }
    }
    let userObj = await user.findOne(condition);
    if (userObj == null) {
        return callback({
            message: "Invalid Account",
        })
    } else if (userObj.verified) {
        return callback({
            message: "User has already been verified",
        })
    } else if (userObj.otp !== props.otp) {
        return callback({
            message: "Invalid OTP"
        })
    }
    const updateDoc = {
        $set: {
            verified: true
        }
    }
    user.updateOne(condition, updateDoc).then((result) => {
        return callback(null, result);
    }).catch((err) => {
        return callback(err);
    });

}








module.exports = {
    createUser,
    verifyUser
}
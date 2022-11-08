const { request } = require('express');
const userService = require('../service/user.service');
const { getResponseCallback } = require('../util/response.callback');


const registerUser = (req, res, next) => {
    const props = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        mobileNumber: req.body.mobileNumber,
        password: req.body.password,
    }
    let callback = getResponseCallback(req, res, next);
    userService.registerUser(props, callback);
}

const verifyUser=(req,res,next)=>{
    const props = {
        emailId: req.body.emailId,
        verificationToken:req.body.verificationToken,
    }
    let callback = getResponseCallback(req, res, next);
    userService.verifyUser(props,callback);
}

const resendVerificationToken=(req,res,next)=>{
    const props = {
        emailId: req.query.emailId,
    }
    let callback = getResponseCallback(req, res, next);
    userService.resendVerificationToken(props,callback);
}

const login=(req,res,next)=>{
    const props={
        emailId:req.params.emailId
    }
    let callback=getResponseCallback(req,res,next);
    userService.generateJWT(props,callback);
}



module.exports = {
    registerUser,
    verifyUser,
    resendVerificationToken
}
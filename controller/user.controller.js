const userService = require('../service/user.service');
const { getResponseCallback } = require('../util/response.callback');


const registerUser = (req, res, next) => {
    let callback = getResponseCallback(req, res, next);

    if (!req.body.password || !req.body.password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}/g)) {
        return callback(400,{
            message:"Password must be of atleast 8 characters containing atleast 1 Upper Case,1 Lower Case and 1 Digit",
        });
      }
      

    const props = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        mobileNumber: req.body.mobileNumber,
        password: req.body.password,
        address:req.body.address
    }
    
    userService.registerUser(props, callback);
}

const resendVerificationToken=(req,res,next)=>{
    let callback = getResponseCallback(req, res, next);
    if(!req.query.emailId) return callback(400,{message:"emailId is required as a query parameter"},null);
    const props = {
        emailId: req.query.emailId,
    }
    userService.resendVerificationToken(props,callback);
}

const verifyUser=(req,res,next)=>{
    let callback = getResponseCallback(req, res, next);
    const props = {
        emailId: req.body.emailId,
        verificationToken:req.body.verificationToken,
    }
    userService.verifyUser(props,callback);
}

const login=(req,res,next)=>{
    let callback=getResponseCallback(req,res,next);
    if (!req.body.emailId || !req.body.password) {
        return callback(400,{message: 'emailId and password are required'});
      }
    const props={
        emailId:req.body.emailId,
        password:req.body.password,
    }
    userService.login(props,callback);
}

const generateAccessToken=(req,res,next)=>{
    let callback = getResponseCallback(req, res, next);
    const props = {
        refreshToken:req.body.refreshToken
    }
    userService.generateAccessToken(props,callback);
}


module.exports = {
    registerUser,
    verifyUser,
    resendVerificationToken,
    login,
    generateAccessToken
}
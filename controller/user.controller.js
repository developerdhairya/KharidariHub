const userService = require('../service/user.service');
const { getResponseCallback } = require('../util/response.callback');


const registerUser = (req, res, next) => {
    const params = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        mobileNumber: req.body.mobileNumber,
        password: req.body.password,
    }
    let callback = getResponseCallback(req, res, next);
    userService.createUser(params, callback);
}

const verifyUser=(req,res,next)=>{
    const params = {
        emailId: req.query.emailId,
        otp:req.body.otp,
    }
    let callback = getResponseCallback(req, res, next);
    userService.verifyUser(params,callback);
}



module.exports = {
    createUser: registerUser,
    verifyUser
}
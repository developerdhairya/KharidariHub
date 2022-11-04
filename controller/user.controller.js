const userService = require('../service/user.service');

const registerUser = (req, res, next) => {
    const params = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        mobileNumber: req.body.mobileNumber,
        password: req.body.password,
    }
    const callback = (err, result) => {
        if (err) {
            next(err);
        } else {
            res.status(200).send(result);
        }
    }
    userService.createUser(params, callback);
}



module.exports = {
    createUser: registerUser
}
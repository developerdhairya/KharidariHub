const { user } = require('../model/user.model');

async function createUser(props, callback) {
    if (!props.password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}/g)) {
        return callback({
            message: "Strong password required",
        });
    }
    const model = new user({
        firstName: props.firstName,
        lastName: props.lastName,
        emailId: props.emailId,
        mobileNumber: props.mobileNumber,
        password: props.password,
    });
    model.save().then((result) => {
        return callback(null, result);
    }).catch((err) => {
        return callback(err);;
    })
}

module.exports = {
    createUser
}
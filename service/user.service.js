const { user } = require('../model/user.model');
const mailTo =require('../util/mailer')

async function createUser(props, callback) {
    if (!props.password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}/g)) {
        return callback({
            message: "Strong password required",
        });
    }
    const otp=Math.floor(Math.random()*1000);
    const model = new user({
        firstName: props.firstName,
        lastName: props.lastName,
        emailId: props.emailId,
        mobileNumber: props.mobileNumber,
        hashedPassword: props.password,
        otp:otp
    });
    model.save().then((result) => {
        mailTo({
            emailId:props.emailId,
            subject:"Welcome to Kharidari Hub",
            body:`Thanks for testing my project.Your otp for email verification is ${otp}`
        })
        return callback(null, result);
    }).catch((err) => {
        return callback(err);;
    })
}

module.exports = {
    createUser
}
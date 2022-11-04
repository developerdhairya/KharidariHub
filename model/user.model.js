const mongoose = require('mongoose');



const user=new mongoose.model(
    "user",
    mongoose.Schema({
        firstName:{
            type:String,
            required:true,
            minLength:2,
            maxLength:20,
        },
        lastName:{
            type:String,
            required:true,
            minLength:2,
            maxLength:20,
        },
        hashedPassword:{
            type:String,
            // required:true
        },
        emailId:{
            type:String,
            required:true,
            unique:true,
            validate:{
                validator:(val)=>{'/^[a-z0-9\.]+@[a-z\.]+\.[a-z]{2,3}$/'.match(val)},
                message:(props)=>{`${props.val} is not a valid emailId`}
            }
        },
        mobileNumber:{
            type:Number,
            required:true,
            unique:true
        },
        active:{
            type:Boolean,
            default:false
        },
        otp:{
            type:Number,
        }
    })
);

module.exports={
    user
}
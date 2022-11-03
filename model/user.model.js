const mongoose = require('mongoose');

const address=mongoose.Schema({
    addressLine1:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50,
    },
    addressLine2:{
        type:String,
        required:false,
        minLength:3,
        maxLength:50,
    },
    country:{
        type:String,
        required:true,
        minLength:4,
        maxLength:30
    },
    zip:{
        type:Number,
        required:true,
        max:100000,
    }
});

const user=new mongoose.model(
    "user",
    mongoose.Schema({
        firstName:{
            type:String,
            required:true,
            minLength:2,
            maxLength:20
        },
        lastName:{
            type:String,
            required:true,
            minLength:2,
            maxLength:20,
        },
        passwordHash:{
            type:String,
            // required:true
        },
        emailId:{
            type:String,
            required:true,
            unique:true,
            validate:{
                validator:(val)=>{'[a-z0-9]+@[a-z \.]+\.[a-z]{2,3}'.test(val)},
                message:(props)=>{`${props.val} is not a valid emailId`}
            }
        },
        mobileNumber:{
            type:Number,
            required:true,
            unique:true
        },
        address:address      
    })
);

module.exports={
    user
}
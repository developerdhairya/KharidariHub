const {user}=require('../model/user.model');

async function createUser(params,callback){
    if(!params.password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}/g)){
        return callback({
            message:"Strong password required",
        });
    }
    const model=new user(params);
    model.save().then((result)=>{
        return callback(null,result);
    }).catch((err)=>{
        return callback(err);;
    })
}

module.exports={
    createUser
}
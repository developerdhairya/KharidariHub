
//responsibile for sending responses to api requests.
const getResponseCallback=(req,res,next)=>{
    let callback=(statusCode,message,err=null)=>{
        if(err){
            if(err.name==="MongoServerError" || err.name==="ValidationError") return res.status(400).json({message:err.message});
            if(err.name==="UnauthorizedError") return res.status(401).json({message:err.message});
            return res.status(500).json({message:err.message});
        }
        res.status(statusCode).send(message);
    };
    return callback;
}

module.exports={
    getResponseCallback
}
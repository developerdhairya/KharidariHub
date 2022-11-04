
//responsibile for sending responses to api requests.
const getResponseCallback=function(req,res,next){
    let callback=(err,result)=>{
        if(err){
            next(err);
        }else{
            res.status(200).send({
                message:"Success",
                data:result,
            });
        }
    }
    return callback;
}

module.exports={
    getResponseCallback
}
const uuid=require('uuid');

function assignId(req,res,next){
    req.id=uuid.v4();
    next();
}

module.exports=assignId;
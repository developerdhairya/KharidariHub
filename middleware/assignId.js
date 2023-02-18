const uuid = require('uuid');

//assigns a 32 character unique id to request
const assignId=(req,res,next)=>{
    req.id=uuid.v4();
    next();
}

module.exports={assignId};
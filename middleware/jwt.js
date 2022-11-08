const jwt = require('jsonwebtoken');


function processJWT(req, res, next) {
    if(!req.headers){
        return res.status(401).json({});
    }
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token || token === null) {
        return res.status(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, res) => {
        if (err) res.status(403);
        req.user = user;
        next();
    })
}



module.exports={
    processJWT
}
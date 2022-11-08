const jwt = require('jsonwebtoken');

const filters=["/api/user/*"];

function processJWT(req, res, next) {
    for(let regexp of filters){
        if(req.path.match(regexp)){
            return next();
        }
    }
    if(!req.headers || !req.headers['authorization']){
        return res.status(401).json({});
    }
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token || token === null) {
        return res.status(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) res.status(403);
        req.user = user;
        next();
    })
}


module.exports={
    processJWT
}
const morgan = require('morgan');

morgan.token('id',(req)=>req.id);

const logFormat = ':id [:date[web]]" :method :url" :status :response-time';

const morganImpl=morgan(logFormat,{
    stream:process.stdout
});

module.exports={
    morganImpl
};

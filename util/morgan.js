const morgan = require('morgan');

/* Apache log format */
const logFormat = ':id [:date[web]]" :method :url" :status :response-time';

morgan.token('id',(req)=>req.id);

const morganImpl=morgan(logFormat,{
    stream:process.stdout
});

module.exports={
    morganImpl
};

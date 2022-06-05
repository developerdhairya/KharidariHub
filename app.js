const express=require('express');
const dotenv=require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const assignId=require('./middlewares/assignId');

//initializing express
const app=express();

//Loading contents from .env file
dotenv.config();

// Connecting to mongodb cluster
mongoose.connect(process.env.MONGO_URL,{});

//setup logging cofigurations
const loggerFormat = ':id [:date[web]]" :method :url" :status :response-time';
morgan.token("id",(req)=>{
    return req.id;
});


//Adding middlewares
app.use(express.json());
app.use(helmet());
app.use(assignId);
app.use(morgan(loggerFormat,{
    stream:process.stdout,
    skip:(req,res)=>{
        return res.statusCode>=400;
    }
}));
app.use(morgan(loggerFormat,{
    stream:process.stderr,
    skip:(req,res)=>{
        return res.statusCode<400;
    }
}));


//routes
app.get('/',async (req,res)=>{
    return res.json({"hi":"hii"});
});


app.listen(process.env.port, () => console.log(`Backend Server is Running on port ${process.env.port}`));

//importing modules
const express=require('express');
const dotenv=require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const requestId = require('express-request-id');

//initializing express
const app=express();

//Loading contents from .env file into process
dotenv.config();

//Connecting to mongodb cluster
mongoose.connect(process.env.MONGO_URL,()=>{
    console.log("Connected to mongodb");
});

//Adding middlewares
app.use(express.json());
app.use(helmet());
app.use(requestId());

//setup logging cofigurations
morgan.token("id",(req)=>{
    return req.id;
});
const loggerFormat = ':id [:date[web]]" :method :url" :status :responsetime';
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








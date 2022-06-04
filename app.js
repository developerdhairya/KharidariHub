const express=require('express');
const dotenv=require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const uuid = require('uuid');

//initializing express
const app=express();

//Loading contents from .env file
dotenv.config();


//Assigning id to each request
function assignId (req, res, next) {
    req.id = uuid.v4()
    next()
  }

// Connecting to mongodb cluster
mongoose.connect(process.env.MONGO_URL,()=>{
    console.log("MongoDB connection established successfully");
});

//Adding middlewares
app.use(express.json());
app.use(helmet());
app.use(assignId);


//setup logging cofigurations
morgan.token("id",(req)=>{
    return req.id;
});
const loggerFormat = ':id [:date[web]]" :method :url" :status :response-time';
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


app.listen(8800, () => console.log("Backend Server is Running"));
//importing modules
const express=require('express');
const dotenv=require('dotenv');
const mongoose = require('mongoose');

//initializing express
const app=express();

//Loading contents from .env file into process
dotenv.config();

//Connecting to mongodb cluster
mongoose.connect(process.env.MONGO_URL,()=>{
    console.log("Connected to mongodb");
});



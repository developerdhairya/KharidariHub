const express=require("express");
const app=express();
const mongoose = require('mongoose');
const {MONGO_CONFIG}=require('./configuration/app.config');

mongoose.connect(MONGO_CONFIG.url).then(()=>console.log("db connected")).catch(()=>console.log("db connection failed"));


app.use(express.json());



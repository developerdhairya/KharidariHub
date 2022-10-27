const express=require("express");
const app=express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const {MONGO_CONFIG}=require('./configuration/app.config');
const {assignId}=require('./middleware/assignId');
const {morganImpl}=require('./util/morgan');

dotenv.config();

//connecting to database
mongoose.connect(MONGO_CONFIG.url).then(()=>console.log("db connected")).catch(()=>console.log("db connection failed"));


app.use(assignId());
app.use(express.json());
app.use(morganImpl);

app.listen(process.env.PORT || 4000,()=>{
    console.log(`Server is listening on port ${process.env.PORT || 4000}`);
})




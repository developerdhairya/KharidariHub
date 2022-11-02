const express=require("express");
const app=express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const {assignId}=require('./middleware/assignId');
const {morganImpl}=require('./util/morgan');
const {SWAGGER_CONFIG}=require('./config/config')
const helmet = require('helmet');
const router=require('./route/route');
const expressJSDocSwagger = require('express-jsdoc-swagger');

dotenv.config();

//connecting to database
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("db connected")).catch((e)=>console.log(e));

app.use(express.json());
app.use(assignId);
app.use(morganImpl);
app.use(helmet());
app.use(express.static(__dirname));
app.use('/api',router);

expressJSDocSwagger(app)(SWAGGER_CONFIG);

app.listen(process.env.PORT || 4000,()=>{
    console.log(`Server is listening on port ${process.env.PORT || 4000}`);
})


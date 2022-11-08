const express=require("express");
const app=express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const {assignId}=require('./middleware/assignId');
const {morganImpl}=require('./util/morgan');
const helmet = require('helmet');
const router=require('./route/route');
const {errorHandler}=require('./middleware/errorHandler');
const {processJWT}=require('./middleware/jwt');

dotenv.config();

//connecting to database
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("db connected")).catch((e)=>console.log(e));

app.use(express.json());
app.use(assignId);
app.use(morganImpl);
app.use(helmet());
app.use(express.static('public'));
app.use(processJWT);
app.use('/api',router);
app.use(errorHandler);


app.listen(process.env.PORT || 4000,()=>{
    console.log(`Server is listening on port ${process.env.PORT || 4000}`);
})


const express=require("express");
const app=express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const {assignId}=require('./middleware/assignId');
const {morganImpl}=require('./util/morgan');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const fs = require('fs');
const customCss = fs.readFileSync((process.cwd()+"/docs/swagger.css"), 'utf8');

// const {autogenImpl}=require('./docs/autogen');

dotenv.config();

//connecting to database
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("db connected")).catch((e)=>console.log(e));

app.use(express.json());
app.use(assignId);
app.use(morganImpl);
app.use(helmet());
app.use('/api',require('./route/app.route'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,{customCss}));

app.listen(process.env.PORT || 4000,()=>{
    console.log(`Server is listening on port ${process.env.PORT || 4000}`);
})


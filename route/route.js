const categoryController=require('../controller/category.controller');
const userController=require('../controller/user.controller');
const paymentService=require('../service/payment.service');
const express = require('express');
const router=express.Router();
const {uploadImg}=require('../multer/category.upload');


router.post('/category',uploadImg,categoryController.createCategory);
router.get('/category/:categoryName',categoryController.getCategoryByName);
router.put('/category/:categoryName',uploadImg,categoryController.updateCategoryByName);
router.delete('/category/:categoryName',categoryController.deleteCategoryByName);
router.get('/category/id/:categoryId',categoryController.getCategoryById);
router.delete('/category/id/:categoryId',categoryController.deleteCategoryById);
router.post('/user',userController.createUser);



module.exports=router;

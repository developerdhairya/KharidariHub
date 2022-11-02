const categoryController=require('../controller/category.controller');
const express = require('express');
const router=express.Router();


router.post('/category',categoryController.uploadImg,categoryController.createCategory);
router.get('/category/:categoryName',categoryController.getCategoryByName);
router.put('/category/:categoryName',categoryController.uploadImg,categoryController.updateCategoryByName);
router.delete('/category/:categoryName',categoryController.deleteCategoryByName);
router.get('/category/id/:categoryId',categoryController.getCategoryById);
router.delete('/category/id/:categoryId',categoryController.deleteCategoryById);


module.exports=router;
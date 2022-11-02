const categoryController=require('../controller/category.controller');
const express = require('express');
const router=express.Router();


router.post('/category',categoryController.uploadImg,categoryController.createCategory);
router.get('/category',categoryController.getCategoryByName);
router.put('/category',categoryController.updateCategoryByName);
router.delete('/category',categoryController.deleteCategoryByName);
router.get('/category/id',categoryController.getCategoryById);
router.put('/category/id',categoryController.updateCategoryById);
router.delete('/category/id',categoryController.deleteCategoryById);


module.exports=router;
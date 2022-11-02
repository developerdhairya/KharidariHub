const categoryController=require('../controller/category.controller');
const express = require('express');
const router=express.Router();

router.post('/category',categoryController.uploadImg,categoryController.createCategory);
router.get('/category',categoryController.getCategoryByName);
router.get('/category/id',categoryController.getCategoryById);
router.put('/category',categoryController.updateCategoryById);
router.delete('/category',categoryController.deleteCategoryById);


module.exports=router;
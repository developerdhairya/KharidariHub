const categoryController=require('../controller/category.controller');
const userController=require('../controller/user.controller');
const productController=require('../controller/product.controller');
const cartController=require('../controller/cart.controller');
const orderController=require('../controller/order.controller');
const express = require('express');
const router=express.Router();
const upload=require('../multer/upload');

router.post('/user', userController.registerUser);
router.put('/user/verify', userController.verifyUser);
router.get('/user/verification/resendToken',userController.resendVerificationToken);
router.post('/user/login',userController.login);
router.get('/user/accessToken',userController.generateAccessToken);

router.post('/category', upload.categoryUpload, categoryController.createCategory);
router.get('/category', categoryController.getCategories);
router.get('/category/:categoryName', categoryController.getCategoryByName);
router.put('/category/:categoryName', upload.categoryUpload, categoryController.updateCategoryByName);
router.delete('/category/:categoryName', categoryController.deleteCategoryByName);
router.get('/category/id/:categoryId', categoryController.getCategoryById);
router.delete('/category/id/:categoryId', categoryController.deleteCategoryById);

router.post('/product', upload.productsUpload, productController.createProduct);
router.get('/product', productController.getProducts);
router.get('/product/:productName', productController.getProductByName);
router.put('/product/:productName', upload.productsUpload, productController.updateProductByName);
router.delete('/product/:productName', productController.deleteProductByName);
router.get('/product/id/:productId', productController.getProductById);
router.delete('/product/id/:productId', productController.deleteProductById);

router.put('/cart/add',cartController.addToCart);
router.put('/cart/deduct',cartController.deductFromCart);
router.get('/cart',cartController.getCart);

router.post('/order/create',orderController.createOrder);




module.exports=router;

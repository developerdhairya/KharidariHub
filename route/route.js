const categoryController=require('../controller/category.controller');
const userController=require('../controller/user.controller');
const productController=require('../controller/product.controller');
const cartController=require('../controller/cart.controller');
const orderController=require('../controller/order.controller');


const express = require('express');
const router=express.Router();
const upload=require('../util/upload');

/*User Routes (Filtered from JWT processor)*/
router.post('/user', userController.registerUser);                                  // done
router.get('/user/verification/resendToken',userController.resendVerificationToken);
router.put('/user/verify', userController.verifyUser);                              
router.post('/user/login',userController.login);
router.get('/user/accessToken',userController.generateAccessToken);

router.post('/category', upload.categoryUpload, categoryController.createCategory);
router.get('/category', categoryController.getAllCategories);
router.get('/category/:categoryName', categoryController.getCategoryByName);
router.put('/category/:categoryId', upload.categoryUpload, categoryController.updateCategoryById);
router.delete('/category/:categoryName', categoryController.deleteCategoryByName);
router.get('/category/id/:categoryId', categoryController.getCategoryById);
router.delete('/category/id/:categoryId', categoryController.deleteCategoryById);

router.post('/product', upload.productsUpload, productController.createProduct);
router.get('/product', productController.getAllProducts);
router.get('/product/:productName', productController.getProductByName);
router.put('/product/:productId', upload.productsUpload, productController.updateProductById);
router.delete('/product/:productName', productController.deleteProductByName);
router.get('/product/id/:productId', productController.getProductById);
router.delete('/product/id/:productId', productController.deleteProductById);

router.put('/cart/add',cartController.addToCart);
router.put('/cart/deduct',cartController.deductFromCart);
router.get('/cart',cartController.getCart);

router.post('/order/create',orderController.createOrder);
router.get('/order/payment/verify/:paymentId',orderController.verifyPayment);
router.get('/order',orderController.getMyOrders);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));


module.exports={router};

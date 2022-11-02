const categoryController=require('../controller/category.controller');
const express = require('express');
const router=express.Router();


/**
 * POST /api/v1/{id}
 * @summary This is the summary or description of the endpoint
 * @param {string} categoryName.required - categoryName
 * @param {string} categoryDescription.required - categoryDescription
 * @param {string} categoryImage.required - categoryImage - multipart/form-data
 * @return {object} 200 - success
 */
router.post('/category',categoryController.uploadImg,categoryController.createCategory);



/**
 * GET /api/category
 * @summary This is the summary or description of the endpoint
 * @param {string} categoryName.query.required - xyz
 * @return {object} 200 - success
 */
router.get('/category',categoryController.getCategoryByName);



/**
 * PUT /api/v1/{id}
 * @summary This is the summary or description of the endpoint
 * @param {string} categoryName.required - categoryName
 * @param {string} categoryDecription.required - categoryDescription
 * @param {string} categoryImage - categoryImage - binary
 * @return {object} 200 - success
 */
 router.put('/category',categoryController.updateCategoryByName);


 /**
 * DELETE /api/category
 * @summary This is the summary or description of the endpoint
 * @param {string} categoryName.query.required - xyz
 * @return {object} 200 - success
 */
  router.delete('/category',categoryController.deleteCategoryByName);



/**
 * GET /api/category/id
 * @summary This is the summary or description of the endpoint
 * @param {string} CategoryId.query.required - name param description
 * @return {object} 200 - success
 */
router.get('/category/id',categoryController.getCategoryById);


/**
 * PUT /api/category/id
 * @summary This is the summary or description of the endpoint
 * @param {Category} request.body.required - songs info - application/json
 * @param {string} CategoryId.query.required - name param description
 * @return {object} 200 - success
 */
router.put('/category/id',categoryController.updateCategoryById);



/**
 * DELETE /api/category/id
 * @summary This is the summary or description of the endpoint
 * @param {string} categoryId.query.required - name param description
 * @return {object} 200 - success
 */
router.delete('/category/id',categoryController.deleteCategoryById);


module.exports=router;
const categoryService=require('../service/category.service');
const { getResponseCallback } = require('../util/response.callback');


const createCategory=(req,res,next)=>{
    let callback=getResponseCallback(req,res,next);
    if(!req.user.isAdmin) return callback(403,{message:"Unauthorized to perform the desired action"});
    let props={
        categoryName:req.body.categoryName,
        categoryDescription:req.body.categoryDescription,
        categoryImage:req.fileName,
    }
    categoryService.createCategory(props,callback);
}

const getCategoryByName=(req,res,next)=>{
    let props={
        categoryName:req.params.categoryName,
        pageSize:req.query.pageSize,
        pageNumber:req.query.pageNumber
    }
    let callback=getResponseCallback(req,res,next);
    categoryService.getCategoryByName(props,callback);
}

const getAllCategories=(req,res,next)=>{
    let props={
        pageSize:req.query.pageSize,
        pageNumber:req.query.pageNumber
    }
    let callback=getResponseCallback(req,res,next);
    categoryService.getAllCategories(props,callback);
}


const getCategoryById=(req,res,next)=>{
    let props={
        categoryId:req.params.categoryId
    }
    let callback=getResponseCallback(req,res,next);
    categoryService.getCategoryById(props,callback);
}

const updateCategoryById=(req,res,next)=>{
    let callback=getResponseCallback(req,res,next);
    if(!req.user.isAdmin) return callback(403,{message:"Unauthorized to perform the desired action"});
    let props={
        categoryId:req.params.categoryId,
        categoryName:req.body.categoryName,
        categoryDescription:req.body.categoryDescription,
        categoryImage:req.fileName,
    }
    categoryService.updateCategoryById(props,callback);
}

const deleteCategoryById=(req,res,next)=>{
    let callback=getResponseCallback(req,res,next);
    if(!req.user.isAdmin) return callback(403,{message:"Unauthorized to perform the desired action"});
    let props={
        categoryId:req.params.categoryId,
    }
    categoryService.deleteCategoryById(props,callback);
}

const deleteCategoryByName=(req,res,next)=>{
    let callback=getResponseCallback(req,res,next);
    if(!req.user.isAdmin) return callback(403,{message:"Unauthorized to perform the desired action"});
    let props={
        categoryName:req.params.categoryName,
    }
    categoryService.deleteCategoryByName(props,callback);
}

module.exports={
    createCategory,
    getAllCategories,
    getCategoryByName,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
    deleteCategoryByName,
}
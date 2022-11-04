const categoryService=require('../service/category.service');
const { getResponseCallback } = require('../util/response.callback');


const createCategory=(req,res,next)=>{
    let props={
        categoryName:req.body.categoryName,
        categoryDescription:req.body.categoryDescription,
        categoryImage:req.fileName,
    }
    let callback=getResponseCallback(req,res,next);
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

const getCategories=(req,res,next)=>{
    let props={
        pageSize:req.query.pageSize,
        pageNumber:req.query.pageNumber
    }
    let callback=getResponseCallback(req,res,next);
    categoryService.getCategories(props,callback);
}


const getCategoryById=(req,res,next)=>{
    let props={
        categoryId:req.params.categoryId
    }
    let callback=getResponseCallback(req,res,next);
    categoryService.getCategoryById(props,callback);
}

const updateCategoryByName=(req,res,next)=>{
    let props={
        categoryName:req.params.categoryName,
        categoryDescription:req.body.categoryDescription,
        categoryImage:req.fileName,
    }
    let callback=getResponseCallback(req,res,next);
    categoryService.updateCategoryByName(props,callback);
}

const deleteCategoryById=(req,res,next)=>{
    let props={
        categoryId:req.params.categoryId,
    }
    let callback=getResponseCallback(req,res,next);
    categoryService.deleteCategoryById(props,callback);
}

const deleteCategoryByName=(req,res,next)=>{
    let props={
        categoryName:req.params.categoryName,
    }
    let callback=getResponseCallback(req,res,next);
    categoryService.deleteCategoryByName(props,callback);
}

module.exports={
    createCategory,
    getCategories,
    getCategoryByName,
    getCategoryById,
    updateCategoryByName,
    deleteCategoryById,
    deleteCategoryByName,
}
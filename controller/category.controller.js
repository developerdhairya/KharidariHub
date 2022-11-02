const categoryService=require('../service/category.service');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname);
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const uploadImg = multer({storage: storage}).single('categoryImage');




// create category
const createCategory=(req,res,next)=>{
    
    let params={
        categoryName:req.body.categoryName,
        categoryDescription:req.body.categoryDescription,
        categoryImage:req.file.path,
    }
    console.log(params);
    console.log(req);
    let callback=(err,result)=>{
        if(err){
            next(JSON.stringify(err));
        }else{
            res.status(200).send({
                message:"Success",
                data:result,
            });
        }
    }
    categoryService.createCategory(params,callback);
}

const getCategoryByName=(req,res,next)=>{
    let params={
        categoryName:req.params.categoryName,
        pageSize:req.params.pageSize,
        pageNumber:req.params.pageNumber
    }
    let callback=(err,result)=>{
        if(err){
            next(err);
        }else{
            res.status(200).send({
                message:"Success",
                data:result,
            });
        }
    }
    categoryService.getCategoryByName(params,callback);
}

const getCategoryById=(req,res,next)=>{
    let params={
        categoryId:req.params.categoryId
    }
    let callback=(err,result)=>{
        if(err){
            next(err);
        }else{
            res.status(200).send({
                message:"Success",
                data:result,
            });
        }
    }
    categoryService.getCategoryById(params,callback);
}

const updateCategoryById=(req,res,next)=>{
    let params={
        categoryId:req.params.categoryId,
        categoryName:req.body.categoryName,
        categoryDescription:req.body.categoryDescription,
        categoryImage:req.body.categoryImage,
    }
    let callback=(err,result)=>{
        if(err){
            next(err);
        }else{
            res.status(200).send({
                message:"Success",
                data:result,
            });
        }
    }
    categoryService.updateCategoryById(params,callback);
}

const deleteCategoryById=(req,res,next)=>{
    let params={
        categoryId:req.params.categoryId,
    }
    let callback=(err,result)=>{
        if(err){
            next(err);
        }else{
            res.status(200).send({
                message:"Success",
                data:result,
            });
        }
    }
    categoryService.deleteCategoryById(params,callback);
}





module.exports={
    createCategory,
    getCategoryByName,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
    uploadImg
}
const categoryService=require('../service/category.service');
const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, __dirname);
      },
    filename: (req, file, cb) =>{
        req.fileName=uuid.v4()+'.'+file.originalname.split('.').pop();
        cb(null, req.fileName);
    }
});
const uploadImg = multer({storage: storage}).single('categoryImage');



const createCategory=(req,res,next)=>{
    let params={
        categoryName:req.body.categoryName,
        categoryDescription:req.body.categoryDescription,
        categoryImage:req.fileName,
    }
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
        categoryName:req.query.categoryName,
        pageSize:req.query.pageSize,
        pageNumber:req.query.pageNumber
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

const updateCategoryByName=(req,res,next)=>{
    let params={
        categoryName:req.query.categoryName,
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
    categoryService.updateCategoryByName(params,callback);
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

const deleteCategoryByName=(req,res,next)=>{
    let params={
        categoryName:req.query.categoryName,
    }
    let callback=(err,result)=>{
        if(err){
            res.status(501).send(err)
            next(err);
        }else{
            res.status(200).send({
                message:"Success",
                data:result,
            });
        }
    }
    categoryService.deleteCategoryByName(params,callback);
}





module.exports={
    createCategory,
    getCategoryByName,
    getCategoryById,
    updateCategoryById,
    updateCategoryByName,
    deleteCategoryById,
    deleteCategoryByName,
    uploadImg
}
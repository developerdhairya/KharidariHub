const categoryService=require('../service/category.service');

const createCategory=(req,res,next)=>{
    let params={
        categoryName:req.body.categoryName,
        categoryDescription:req.body.categoryDescription,
        categoryImage:req.fileName,
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
    categoryService.createCategory(params,callback);
}

const getCategoryByName=(req,res,next)=>{
    let params={
        categoryName:req.params.categoryName,
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
    console.log(req.params.categoryId);
    let params={
        categoryId:req.params.categoryId
    }
    let callback=(err,result)=>{
        if(err){
            console.log(JSON.stringify(err));
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

const updateCategoryByName=(req,res,next)=>{
    let params={
        categoryName:req.params.categoryName,
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
        categoryName:req.params.categoryName,
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
    updateCategoryByName,
    deleteCategoryById,
    deleteCategoryByName,
}
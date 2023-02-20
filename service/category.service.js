const category = require('../model/category.model');
const {uploadToCloudinary}=require('../util/upload');


async function createCategory(props, callback) {
  const model = new category({
    categoryName: props.categoryName,
    categoryDescription: props.categoryDescription,
  });
  try{
    console.log(props.categoryImage);
    if(props.categoryImage){
      model.categoryImage= props.categoryImage.path;
    }
    let modelObj= await model.save();
    return callback(201,{message:"success",data:modelObj});
  }catch(err){
    return callback(null,null,err);
  }
}

async function getAllCategories(props, callback) {
  const pageSize = Math.abs(props.pageSize) || 10;
  const pageNumber = Math.abs(props.pageNumber) || 1;
  const sort=props.sort<=0?-1:1;
  category.find({}).limit(pageSize).skip(pageSize * (pageNumber - 1)).sort({categoryName:sort}).then((data) => {
    return callback(200, data);
  }).catch((err) => {
    return callback(null,null,err);
  });
}

async function getCategoryById(props, callback) {
  category.findById(props.categoryId).then((data) => {
    return data?callback(200, {message:data}):callback(404,{message:"Invalid Category"});
  }).catch((err) => {
    return callback(null,null,err);
  });
}


async function getCategoryByName(props, callback) {
  const condition = {
    categoryName: props.categoryName
  };
  category.findOne(condition).then((data) => {
    return data?callback(200, {message:data}):callback(404,{message:"Invalid Category"});
  }).catch((err) => {
    return callback(null,null,err);
  });
}


async function updateCategoryById(props, callback) {
  const tempDoc={};
  for(let key in props){
    if(props[key] && key!=="categoryId") tempDoc[key]=props[key];
  }
  if(Object.keys(tempDoc).length===0) return callback(400,{message:"Empty Body"});
  const updateDoc = {
    $set: tempDoc,
  };
  const options = {upsert: false};
  try{
    if(props.categoryImage){
      updateDoc.categoryImage= await uploadToCloudinary(process.cwd()+'/uploads/'+props.categoryImage);
    }
    let modelObj=await category.findByIdAndUpdate(props.categoryId, updateDoc, options);
    return modelObj===null?callback(400,{message:"Invalid Category"}):callback(201,{message:"success",data:modelObj});
  }catch(err){
    return callback(null,null,err);
  }
}


async function deleteCategoryById(props, callback) {
  const condition = {
    _id: props.categoryId,
  };
  category.deleteOne(condition).then((data) => {
    return data.deletedCount!==0?callback(200, {message:data}):callback(404,{message:"Invalid Category"});
  }).catch((err) => {
    return callback(null,null,err);
  });
}


async function deleteCategoryByName(props, callback) {
  const condition = {
    categoryName: props.categoryName,
  };
  category.deleteOne(condition).then((data) => {
    return data.deletedCount!==0?callback(200, {message:data}):callback(404,{message:"Invalid Category"});
  }).catch((err) => {
    return callback(null,null,err);
  });
}

module.exports = {
  createCategory,
  getCategoryById,
  getCategoryByName,
  getAllCategories,
  updateCategoryById,
  deleteCategoryById,
  deleteCategoryByName,
};

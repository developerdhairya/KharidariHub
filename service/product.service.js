const product = require('../model/product.model');
const category = require('../model/category.model');




async function createProduct(props, callback) {
  const model = new product({
    productName: props.productName,
    productDescription: props.productDescription,
    richDescription: props.richDescription,
    brand: props.brand,
    price: props.price,
    categoryId: props.categoryId,
    stock: props.stock,
    rating: props.rating,
    isFeatured: props.isFeatured,
  });
  try{
    let categoryObj=await category.findById(props.categoryId);
    if(!categoryObj) return callback(400,{message:"Invalid category Id"});
    let imgArr=[];
    for(let obj of props.productImages){
      imgArr.push(obj.path);
    }
    if(imgArr.length!==0) model.productImages=imgArr;
    let modelObj= await model.save();
    return callback(201,{message:"success",data:modelObj});
  }catch(err){
    return callback(null,null,err);
  }
}

async function getAllProducts(props, callback) {
  const pageSize = Math.abs(props.pageSize) || 10;
  const pageNumber = Math.abs(props.pageNumber) || 1;
  const sort=props.sort<=0?-1:1;
  product.find({}).limit(pageSize).skip(pageSize * (pageNumber - 1)).sort({productName:sort}).then((data) => {
    return callback(200, data);
  }).catch((err) => {
    return callback(null,null,err);
  });
}

async function getProductById(props, callback) {
  product.findById(props.productId).then((data) => {
    return data?callback(200, {message:data}):callback(404,{message:"Invalid Product"});
  }).catch((err) => {
    return callback(null,null,err);
  });
}


async function getProductByName(props, callback) {
  const condition = {
    productName: props.productName
  };
  product.findOne(condition).then((data) => {
    return data?callback(200, {message:data}):callback(404,{message:"Invalid Product"});
  }).catch((err) => {
    return callback(null,null,err);
  });
}


async function updateProductById(props, callback) {
  const tempDoc={};
  for(let key in props){
    if(props[key] && key!=="productId") tempDoc[key]=props[key];
  }
  if(Object.keys(tempDoc).length===0) return callback(400,{message:"Empty Body"});
  const updateDoc = {
    $set: tempDoc,
  };
  const options = {upsert: false};
  try{
    let imgArr=[];
    for(let obj of props.productImages){
      imgArr.push(obj.path);
    }
    if(imgArr.length!==0) updateDoc.productImages=imgArr;
    await product.findByIdAndUpdate(props.productId, updateDoc, options);
    return callback(201,{message:"success"});
  }catch(err){
    return callback(null,null,err);
  }
}


async function deleteProductById(props, callback) {
  const condition = {
    _id: props.productId,
  };
  product.deleteOne(condition).then((data) => {
    return data.deletedCount!==0?callback(200, {message:data}):callback(404,{message:"Invalid Product"});
  }).catch((err) => {
    return callback(null,null,err);
  });
}


async function deleteProductByName(props, callback) {
  const condition = {
    productName: props.productName,
  };
  product.deleteOne(condition).then((data) => {
    return data.deletedCount!==0?callback(200, {message:data}):callback(404,{message:"Invalid Product"});
  }).catch((err) => {
    return callback(null,null,err);
  });
}

module.exports = {
  createProduct,
  getProductById,
  getProductByName,
  getAllProducts,
  updateProductById,
  deleteProductById,
  deleteProductByName,
};



// if(props.productImages){
    //   let promises=props.productImages.map((image)=>{
    //     return uploadToCloudinary(process.cwd()+'/uploads/'+image.filename);
    //   });
    //   model.productImages= await Promise.all(promises);
    // }
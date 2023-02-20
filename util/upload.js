const multer = require('multer');
const uuid = require('uuid');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const fs = require('fs');

// const storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null, process.cwd()+'/uploads');
//       },
//     filename: (req, file, cb) =>{
//         req.fileName=uuid.v4()+'.'+file.originalname.split('.').pop();
//         cb(null, req.fileName);
//     }
// });


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'images',
      format: async (req, file) => 'png', 
      public_id: (req, file) => uuid.v4(),
    },
  });
  

const categoryUpload = multer({storage: storage}).single('categoryImage');
const productsUpload = multer({storage: storage}).array('productImages',10);




// let uploadToCloudinary=async (localPath)=> {
//     const cloudPath = "main/" + localPath;
//     try{
//         let dataObject=await cloudinary.uploader.upload(localPath, { public_id: cloudPath });
//         return dataObject.url;
//     }catch(err){
//         console.log(err);
//     }finally{
//         fs.unlink(localPath,()=>console.log(`${localPath} deleted`));
//     }
// }


module.exports={
    categoryUpload,
    productsUpload,
    // uploadToCloudinary
}
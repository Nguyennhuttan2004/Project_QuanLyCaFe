const cloudinary = require('cloudinary').v2;
const multer = require('multer')

cloudinary.config({
    cloud_name: 'dbgaxbv1k',
    api_key: '127144975441365',
    api_secret: 'hQDeXRPdOnFcEeo8ZaYH2eFxGPs'
})

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
  
    return result;
  }

const upload = multer({storage})
 module.exports  = {upload, imageUploadUtil}

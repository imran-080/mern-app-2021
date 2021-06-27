const cloudinary = require("cloudinary").v2;
const multer = require("multer")
const { CloudinaryStorage} = require("multer-storage-cloudinary");


// confingure cloudinary
cloudinary.config({
    cloud_name: 'dfbfristv',
    api_key: '785929571141796',
    api_secret: '0Mo4wOYQ6iPsVSVAY50CvQvUIl0'
});
//configure cloudinary storage
const clStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'CDB21DX003',
            public_key: file.fieldname + '-' + Date.now()
        }
    }
})
//configure multer
const multerObj=multer({storage: clStorage})

module.exports = multerObj
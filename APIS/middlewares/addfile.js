const cloudinary = require("cloudinary").v2;
const multer = require("multer")
const { CloudinaryStorage} = require("multer-storage-cloudinary");


// confingure cloudinary
cloudinary.config({
    cloud_name: 'dadksa9sf',
    api_key: '681543454554146',
    api_secret: 'i8TUg6YYf8k3bSJxqtcZXl9kgAM'
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
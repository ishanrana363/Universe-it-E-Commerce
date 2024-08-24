const fs = require('fs');
const path = require('path');
const multer = require('multer');
const e = require('cors');

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, '../upload');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Updated to use the correct path
    },
    filename: function (req, file, cb) {
        const extname = path.extname(file.originalname); 
        cb(null, `${Date.now()}-${file.fieldname}${extname}`); 
    }
});
const allowFileType = ["jpg","png","jpge"]
const fileFilter = (req,file,cb)=>{
    const extname = path.extname(file.originalname); 
    if(!allowFileType.includes(extname.substring(1))){
        return cb(new Error('File type not allowed'), false);
    }
    cb(null, true)
};

const upload = multer({
    storage: storage,
    limits : {
        fileSize : 2097152
    },
    fileFilter

});

module.exports = upload;

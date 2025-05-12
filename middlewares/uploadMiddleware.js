const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');  
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);  
    cb(null, `${Date.now()}-${file.fieldname}${fileExt}`);  
  }
});


const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    return cb(null, true); 
  } else {
    cb(new Error('Only .jpg, .jpeg, .png files are allowed!'), false);  
  }
};

const upload = multer({
  storage,
  fileFilter
});

module.exports = upload;

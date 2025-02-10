const multer = require('multer');
const path = require('path');
// const fileModel = require('../models/fileModel');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Multer instance with validation
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only images are allowed (JPEG, PNG, GIF)'), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB file size limit
});

// Middleware for file upload
exports.uploadFile = upload.single('image');

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController=require('../controllers/authController');
const fileController = require('../controllers/fileController');
const fileMiddleware=require('../middlewares/fileuploadMiddleware');
const fileError=require('../utils/validateFile');

// Route to get all users
router.post('/login', authController.loginUser);
router.post('/register',authController.registerUser);
router.put('/update',userController.updateUser);
router.delete('/delete',userController.deleteUser);
router.post('/upload',fileMiddleware.uploadFile,fileError, fileController.uploadResponse);

module.exports = router;

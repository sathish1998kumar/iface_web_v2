const express = require('express');
const user = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/data', verifyToken, user.getUsers);

module.exports = router;

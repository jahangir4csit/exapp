const express = require('express');
const router = express.Router();
const adminProtected = require('../middleWare/authAdmin');
const { registerUser, loginUser, logoutUser } = require('../controllers/userController');
const { addRole } = require('../controllers/roleController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/logout", logoutUser);
router.post("/add-role", adminProtected, addRole);

module.exports = router;
const express = require('express');
const router = express.Router();
const {protected, authorizePermissions} = require('../middleWare/authMiddleware');
const { registerUser, loginUser, logoutUser, loginStatus, getUser } = require('../controllers/userController');
const { addRole } = require('../controllers/roleController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/getuser", protected, getUser);
router.get("/logout", logoutUser);
router.get("/loggedin", loginStatus);
router.post("/add-role", protected, authorizePermissions('admin'), addRole);

module.exports = router;
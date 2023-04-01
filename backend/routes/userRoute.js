const express = require('express');
const router = express.Router();
const {protected, authorizePermissions} = require('../middleWare/authMiddleware');
const { registerUser, loginUser, logoutUser, loginStatus, getUser, getUsers } = require('../controllers/userController');
const { addRole } = require('../controllers/roleController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/getuser", protected, getUser);
router.get("/logout", logoutUser);
router.get("/loggedin", loginStatus);
router.get("/all", protected, authorizePermissions('admin'), getUsers);
router.patch("/add-role/:id", protected, authorizePermissions('admin'), addRole);

module.exports = router;
const express = require('express');
const router = express.Router();
const passport = require("passport");
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

router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.FRONTEND_URL,
		failureRedirect: "/login/failed",
	})
);

module.exports = router;
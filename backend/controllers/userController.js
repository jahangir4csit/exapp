const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Token = require('../models/tokenModel');
const sendEmail = require("../utils/sendEmail");

// Generate Token
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: "1d" })
}

// Register User
const registerUser = asyncHandler(async(req, res)=>{
    const { name, email, password } = req.body;
    // Validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all required fields");
    }
    if (password.length < 6) {
        res.status(400);
        throw new Error("Password must be up to 6 characters");
    }
    // Check if user email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("Email has already been registered");
    }

    // Create New User 
    const user = await User.create({
        name, email, password
    })

    // Generate Token
    const token = generateToken(user._id)

    // Send HTTP-only cookie
    res.cookie("token", token, {
        path: '/',
        httpOnly: true,
        expire: new Date(Date.now() + 1000 * 86400), // 1 Day
        sameSite: "none",
        secure: true
    });

    if (user) {
        const { _id, name, email, bio } = user;
        res.status(201).json({
            _id,
            name,
            email,
            bio,
            token
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }

})

module.exports = {
    registerUser,
}
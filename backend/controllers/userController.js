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

// @Register User
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

    // Send Mail
    const message = `
    <h2>Hello ${user.name}</h2>
    <p>Your registration cmpleted successfuly</p>
    <p>Thank you for join with us</p>
    
    <a href="/login" clicktracking="off">Login</a>
    <p>Regards...</p>
    <em>Exapp Team</em>`;

    const subject = "Registration Success"
    const send_to = user.email
    const sent_from = process.env.EMAIL_USER

    try {
        await sendEmail(subject, message, send_to, sent_from);
        res.status(200).json({
            success: true,
            message: 'Confirmation mail sent!'
        })
    }catch (error) {
        res.status(500)
        throw new Error("Email not sent, Please try again")
    }

});

// @Login User

const loginUser = asyncHandler( async(req, res)=>{
    const {email, password} = req.body
    // Validate Request
    if (!email || !password){
        res.status(400);
        throw new Error("Please add email and Password!");
    }
    // check if User exist
    const user = await User.findOne({email});
    if (!user){
        res.status(400);
        throw new Error("User not found!");
    }
    // User exist, check password if correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    // Generate Token
    const token = generateToken(user._id)

    // Send HTTP-only cookie
    if (passwordIsCorrect) {
        res.cookie("token", token, {
            path: '/',
            httpOnly: true,
            expire: new Date(Date.now() + 1000 * 86400), // 1 Day
            sameSite: "none",
            secure: true
        });
    }
    // User Login
    if(user && passwordIsCorrect){
        const { _id, name, email, photo, phone, bio } = user;
        res.status(200).json({
            _id,
            name,
            email,
            bio,
            token
        });
    }else{
        res.status(400);
        throw new Error("Invalid Email or Password!");
    }

});

// @logout user
const logoutUser = asyncHandler(async(req, res)=>{
    res.cookie("token", "", {
        path: '/',
        httpOnly: true,
        expire: new Date(0), // expire now
        sameSite: "none",
        secure: true
    });
    return res.status(200).json({ message: 'Successfully Logged Out'})
});

// @get User Data
const getUser = asyncHandler(async(req, res)=>{

    const user = await User.findById(req.user._id)
    if (user) {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            phone,
            bio
        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }

});

// Get Login Status
const loginStatus = asyncHandler(async(req, res)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json(false)
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if(verified){
        return res.json(true)
    }
    return res.json(false)
});

module.exports = {
    registerUser,
    loginUser,
    getUser,
    logoutUser,
    loginStatus
}
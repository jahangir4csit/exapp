const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");

const adminProtected = asyncHandler(async(req, res, next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            res.status(401)
            throw new Error("Not Authorized, Please login")
        }
        // Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        //Get user id from token
        const user = await User.findById(verified.id).select("-password")
        if(!user || user.role !== 'admin'){
            res.status(401)
            throw new Error("Not Allowed to access")
        }
        req.user = user
        next()

    }catch (e) {
        res.status(401)
        throw new Error("Not Authorized, Please login as admin")
    }
});

module.exports = adminProtected
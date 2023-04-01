const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const addRole = asyncHandler(async(req, res)=>{
    const { id } = req.params; 
    const user = await User.findById(id);
    if(user){
        const { name, photo, role } = user;
        user.role = req.body.role || role;

        const updateRole = await user.save();
        res.status(200).json({
            _id: updateRole._id,
            role: updateRole.role,
        });
    }else{
        res.status(404);
        throw new Error("User not found");
    }
});

module.exports = {
    addRole,
}
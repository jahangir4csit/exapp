const asyncHandler = require('express-async-handler');

const addRole = asyncHandler(async(req, res)=>{
    res.send('Role Added');
});

module.exports = {
    addRole,
}
const asyncHandler = require('express-async-handler');
// Create Product
const createProduct = asyncHandler(async(req, res)=>{
    res.send('Create Product');
})

module.exports = {
    createProduct,
}
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const { fileSizeFormatter } = require('../utils/fileUpload');
const cloudinary = require('cloudinary').v2;

// Create Product
const createProduct = asyncHandler(async(req, res)=>{
    const {name, sku, category, quantity, price, description} = req.body;

    if(!name || !sku || !category || !quantity || !price || !description){
        res.status(400)
        throw new Error('please fill in All fields')
    }

    // Handle Image Upload
    let fileData = {}
    if(req.file){
        // Save Image to cloudinary
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "exapp", resource_type: "image"
            })
        }catch (err){
            res.status(500);
            throw new Error("Image could not be uploaded")
        }
        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimeType,
            fileSize: fileSizeFormatter(req.file.size, 2),
        }
    }

    // Create product
    const product = await Product.create({
        user: req.user.id,
        name,
        sku,
        category,
        quantity,
        price,
        description,
        image: fileData
    });
    res.status(201).json(product)

});

module.exports = {
    createProduct,
}
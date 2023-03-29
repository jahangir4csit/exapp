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
        // image: fileData
    });
    res.status(201).json(product)

});

// get all products
const getProducts = asyncHandler(async(req, res)=>{
    const products = await Product.find({ user: req.user.id }).sort("-createdAt");
    res.status(200).json(products);
});

// Delete Product
const deleteProduct = asyncHandler(async(req, res)=>{

    const product = await Product.findById(req.params.id);
    //if product does not exist
    if(!product){
        res.status(404)
        throw new Error("Product not found!")
    }
    //Match product to its user
    if(product.user.toString() !== req.user.id){
        res.status(401);
        throw new Error("User not authorized!")
    }
    await product.remove();
    res.status(200).json({ message: 'Product Deleted!'});

});

// Update Product
const updateProduct = asyncHandler(async(req, res)=>{
    const { name, category, quantity, price, description } = req.body;

    const { id } = req.params;

    const product = await Product.findById(id);

    //if product does not exist
    if(!product){
        res.status(404)
        throw new Error("Product not found!")
    }
    //Match product to its user
    if(product.user.toString() !== req.user.id){
        res.status(401);
        throw new Error("User not authorized!")
    }

    // Handle Image Upload
    let fileData = {}
    if(req.file){
        // Save Image to cloudinary
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "Pinvent Pro", resource_type: "image"
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

    // Update Product
    const updatedProduct = await Product.findByIdAndUpdate(
        {_id: id},
        {
            name,
            category,
            quantity,
            price,
            description,
            image: Object.keys(fileData).length === 0 ? product?.image : fileData,
        },{
            new: true,
            runValidators: true
        }
    );
    res.status(200).json(updatedProduct);
});

module.exports = {
    createProduct,
    getProducts,
    deleteProduct,
    updateProduct
}
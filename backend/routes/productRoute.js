const express = require('express');
const router = express.Router();
const protected = require('../middleWare/authMiddleware');
const {upload} = require('../utils/fileUpload');
const { createProduct, getProducts, deleteProduct, updateProduct } = require('../controllers/productController');


router.post('/', protected,  upload.single('image'), createProduct);
router.post('/', protected, upload.single('image'), createProduct);
router.patch('/:id', protected, upload.single('image'), updateProduct);
router.get('/', protected, getProducts);
router.delete('/:id', protected, deleteProduct);

module.exports = router;
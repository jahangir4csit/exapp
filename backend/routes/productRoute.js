const express = require('express');
const router = express.Router();
const {protected, authorizePermissions} = require('../middleWare/authMiddleware');
const {upload} = require('../utils/fileUpload');
const { createProduct, getProducts, getProduct, deleteProduct, updateProduct } = require('../controllers/productController');


router.post('/', protected,  upload.single('image'), createProduct);
router.get('/', protected, authorizePermissions('user', 'admin', 'superadmin'), getProducts);
router.get("/:id", protected, getProduct);
router.patch('/:id', protected, upload.single('image'), updateProduct);
router.delete('/:id', protected, authorizePermissions('admin', 'superadmin'), deleteProduct);

module.exports = router;
//EXPRESS IMPORT AND CONFIGURATION
const express = require('express');
const routes = express.Router();

const UserController = require('../controllers/UserController');
const CategoryController = require('../controllers/CategoryController');
const SubCategoryController = require('../controllers/SubCategoryController');
const ProductController = require('../controllers/ProductController');
const SupplierController = require('../controllers/SupplierController');
const LoginController = require('../controllers/LoginController');

//MULTER (3RD PARTY) PACKAGE CONFIGURATION

const limits = {
    fileSize: 400 * 400
  };
const multer = require('multer');
const uploadConfig = require('../config/upload');
const upload = multer(uploadConfig, limits);


/** ROUTES GOES HERE */

//DEFAULT ROUTE
routes.get('/', (req, res) => {
    res.send('Welcome to Point of Sale')
})

/**----USER ROUTES----- */
routes.post('/user/login', LoginController.login);
routes.post('/user/register', UserController.createUser);
routes.get('/user/:userId', UserController.getUserById);
routes.get('/users/', UserController.getAllUsers);
routes.delete('/user/delete/:userId', UserController.deleteUserById);
/**----USER ROUTES----- */

/**----CATEGORY ROUTES----- */
routes.post('/category/create', upload.single('thumbnail'), CategoryController.createCategory);
routes.get('/category/:categoryId', CategoryController.getCategoryById);
routes.get('/categories/', CategoryController.getAllCategories);
routes.delete('/category/delete/:categoryId', CategoryController.deleteCategoryById);
/**----CATEGORY ROUTES----- */

/**----SUBCATEGORY ROUTES----- */
routes.post('/subcategory/create', upload.single('thumbnail'), SubCategoryController.createSubCategory);
routes.get('/subcategory/:subcategoryId', SubCategoryController.getSubCategoryById);
routes.get('/subcategories/:category', SubCategoryController.getSubCategoryByCategoryId);
routes.get('/subcategories/', SubCategoryController.getAllSubCategories);
routes.delete('/subcategory/delete/:subcategoryId', SubCategoryController.deleteSuBCategoryById);
/**----SUBCATEGORY ROUTES----- */

/**----PRODUCT ROUTES----- */
routes.post('/product/create', upload.single('ProductThumbnail'), ProductController.createProduct);
routes.get('/product/all', ProductController.getAllProducts);
routes.get('/product/:productId', ProductController.getProductById);
/**----PRODUCT ROUTES----- */

/**----SUPPLIER ROUTES----- */
routes.post('/supplier/create', upload.single('CompanyThumbnail'), SupplierController.createSupplier);
routes.get('/supplier/:supplierId', SupplierController.getSupplierById)
routes.get('/suppliers', SupplierController.getAllSuppliers);
routes.delete('/supplier/delete/:supplierId', SupplierController.deleteSupplierById);
/**----SUPPLIER ROUTES----- */

module.exports = routes;
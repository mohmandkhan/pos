const Product = require('../models/Product');
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const User = require('../models/User');

module.exports = {
    //METHOD FOR CREATING A PRODUCT
    async createProduct(req, res) {
        const {
            ProductBarcode,
            ProductCategory,
            ProductSubCategory,
            ProductTitle,
            ProductDescription,
            ProductModel,
            ProductSKU,
            ProductCostPrice,
            ProductSalePrice
        } = req.body;

        const { user_id } = req.headers;
        const { filename } = req.file;

        //Check If user exists
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        //Check if Category Exists
        const category = await Category.findById(ProductCategory);
        if (!category) {
            return res.status(400).json({ message: 'Category not found' });
        }
        //Check if SubCategory Exists
        const subcategory = await SubCategory.findById(ProductSubCategory);
        if (!subcategory) {
            return res.status(400).json({ message: 'SubCategory not found' });
        }

        try {
            const product = await Product.create({
                ProductBarcode,
                ProductCategory,
                ProductSubCategory,
                ProductTitle,
                ProductDescription,
                ProductModel,
                ProductSKU,
                ProductCostPrice,
                ProductSalePrice,
                ProductPublishBy: user_id,
                ProductThumbnail: filename,
                ProductUser: user_id
            })
            return res.json(product);

        } catch (error) {
            res.status(400).json({ message: error })
        }
    },

    //METHOD FOR GETTING ALL PRODUCTS
    async getAllProducts(req, res) {
        try {

            const products = await Product.find()
                .populate({
                    path: 'ProductCategory',
                })
                .populate({
                    path: 'ProductSubCategory',
                })
                .populate({
                    path: 'ProductPublishBy',
                })
                .populate({
                    path: 'ProductUser',
                });


            return res.json(products);

        } catch (error) {
            return res.status(400).json({ message: error })
        }
    },

    //METHOD FOR GETTING PRODUCT BY ID
    async getProductById(req, res) {
        try {
            const { productId } = req.params;
            const product = await Product.findById(productId);
            await product
                .populate('ProductCategory')
                .populate('ProductSubCategory')
                .populate('ProductPublishBy')
                .populate('ProductUser')
                .execPopulate();
            if (product) {
                return res.json({ product });
            }
            return res.status(400).json({ message: 'Product not found.' })

        } catch (error) {
            throw Error(`Error getting product ${error}`);
        }
    }
}
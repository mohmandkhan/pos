const Category = require('../models/Category');
const User = require('../models/User');

module.exports = {

    //METHOD FOR CREATING CATEGORY
    async createCategory (req, res) {

        const {CategoryName, CategoryDescription, CategoryDate} = req.body;
        const {user_id} = req.headers;
        const {filename} = req.file;

        //Check if user exists
        const user = await User.findById(user_id);
        if(!user){
            return res.status(400).json({message: 'User does not exist.'});
        }

        //Otherwise
        const category = await Category.create({
            CategoryName,
            CategoryDescription,
            user: user_id,
            date: CategoryDate,
            thumbnail: filename
        });
        return res.json(category);
    },

    //METHOD FOR GETTING CATEGORY BY ID
    async getCategoryById(req, res) {
        const {categoryId} = req.params;
        try{
        
            const category = await Category.findById(categoryId);
            await category
            .populate('user', '-password')
            .execPopulate();
            if(category){
                return res.json(category);
            }
            return res.status(400).json({message: 'Category not found'});

        }catch(error)
        {
            return res.status(400).json({message: 'Category not found'});
        }
    },

    //METHOD FOR GETTING ALL CATEGORIES
    async getAllCategories(req, res){
        try{
            const categories = await Category.find()
            .populate({
                path: 'user',
            });
            if(categories){
                return res.json(categories);
            }
            return res.status(400).json({message: 'No Category found'})

        }catch(error){
            return res.status(400).json({message: error})
        }
    },

    //METHOD FOR DELETING CATEGORY BY ID
    async deleteCategoryById(req, res){
        const {categoryId} = req.params;
        try{
            await Category.findByIdAndDelete(categoryId);
            return res.status(200).send();

        }catch(error){
            throw Error(`Error deleting category ${error}`)
        }
    }
}
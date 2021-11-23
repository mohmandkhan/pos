const SubCategory = require('../models/SubCategory');
const Category = require('../models/Category');
const User = require('../models/User');

module.exports = {

    //METHOD FOR CREATING SUBCATEGORY
    async createSubCategory (req, res) {

        const {SubCategoryName, SubCategoryDescription, SubCategoryDate, category_id} = req.body;
        const {user_id} = req.headers;
        const {filename} = req.file;

        //Check if category exists
        const category = await Category.findById(category_id);
        if(!category){
            return res.status(400).json({message: 'Category not found'});
        }

        //Check if user exists
        const user = await User.findById(user_id);
        if(!user){
            return res.status(400).json({message: 'User does not exist.'});
        }

        //Otherwise
        const subcategory = await SubCategory.create({
            SubCategoryName,
            SubCategoryDescription,
            thumbnail: filename,
            user: user_id,
            date: SubCategoryDate,
            category: category_id
        });
        return res.json(subcategory);
    },

    //METHOD FOR GETTING SUBCATEGORY BY ID
    async getSubCategoryById(req, res) {
        const {subcategoryId} = req.params;
        try{
        
            const subcategory = await SubCategory.findById(subcategoryId);
            await subcategory
            .populate('user')
            .execPopulate();
            if(subcategory){
                return res.json(subcategory);
            }
            return res.status(400).json({message: 'SubCategory not found'});

        }catch(error)
        {
            return res.status(400).json({message: 'SubCategory not found'});
        }
    },

    //METHOD FOR GETTING SUBCATEGORY BY CATEGORY ID
    async getSubCategoryByCategoryId(req, res) {
        const {category} = req.params;
        //console.log(category);
        try{
        
            const subcategory = await SubCategory.find({category});
            if(subcategory){
                return res.json(subcategory);
            }
            return res.status(400).json({message: 'SubCategories not found'});

        }catch(error)
        {
            return res.status(400).json({message: 'SubCategories not found'});
        }
    },

     //METHOD FOR GETTING ALL SUBCATEGORIES
     async getAllSubCategories(req, res){
        try{
            const subcategories = await SubCategory.find()
            .populate({
                path: 'user'
            })
            .populate({
                path: 'category'
            });
            if(subcategories){
                return res.json(subcategories);
            }
            return res.status(400).json({message: 'No SubCategory found'})

        }catch(error){
            return res.status(400).json({message: error})
        }
    },

    //METHOD FOR DELETING SUBCATEGORIES BY ID
    async deleteSuBCategoryById(req, res){
        const {subcategoryId} = req.params;
        try{
            await SubCategory.findByIdAndDelete(subcategoryId);
            return res.status(200).json({message:'Deleted'});

        }catch(error){
            throw Error(`Error deleting subcategory ${error}`)
        }
    }
}
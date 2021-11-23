const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
    SubCategoryName: String,
    SubCategoryDescription: String,
    thumbnail: String,
    date: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
})

module.exports = mongoose.model('SubCategory', SubCategorySchema);
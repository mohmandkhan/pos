const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    CategoryName: String,
    CategoryDescription: String,
    thumbnail: String,
    date: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model('Category', CategorySchema);
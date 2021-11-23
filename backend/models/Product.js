const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    ProductBarcode: {
        type: String,
        required: true,
        trim: true,
        min: 0,
        max: 255
    },
    ProductCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        trim: true,
        min: 0,
        max: 255
    },
    ProductSubCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true,
        trim: true,
        min: 0,
        max: 255
    },
    ProductTitle: {
        type: String,
        required: true,
        trim: true,
        min: 0,
        max: 255
    },
    ProductDescription: {
        type: String,
        required: true,
        trim: true,
        min: 0,
        max: 1024
    },
    ProductModel: {
        type: String,
        required: true,
        trim: true,
        min: 0,
        max: 255
    },
    ProductSKU: {
        type: String,
        required: true,
        trim: true,
        min: 0,
        max: 255
    },
    ProductCostPrice: {
        type: Number,
        required: true
    },
    ProductSalePrice: {
        type: Number,
        required: true
    },
    ProductPublishDate: Date,
    ProductPublishBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    ProductThumbnail: String,
    ProductUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        trim: true,
        min: 0,
        max: 255
    }
})

module.exports = mongoose.model('Product', ProductSchema);
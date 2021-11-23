const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    CompanyName: {
        type: String,
        required: true,
        trim: true,
        min: 0,
        max: 255
    },
    CompanyPhone: {
        type: String,
        required: true,
        trim: true,
        min: 0,
        max: 255
    },
    CompanyEmail: {
        type: String,
        required: false,
        trim: true,
        min: 0,
        max: 255
    },
    CompanyContactPerson: {
        type: String,
        required: true,
        trim: true,
        min: 0,
        max: 255
    },
    CompanyAddress: {
        type: String,
        required: true,
        trim: true,
        min: 0,
        max: 255
    },
    CompanyThumbnail: {
        type: String
    }

});

module.exports = mongoose.model('Supplier', SupplierSchema);
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneno: String,
    username: String,
    password: String
})

module.exports = mongoose.model('User', UserSchema);
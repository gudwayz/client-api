const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, maxlength: 40, required: true },
    email: { type: String, maxlength: 40, required: true, unique: true },
    company: { type: String, maxlength: 40, required: true },
    password: { type: String, maxlength: 40, minlength: 8, required: true },
    address: { type: String },
    phone: { type: Number, minlength: 11 },
}, { timestamps: true })


module.exports = mongoose.model('User', userSchema);
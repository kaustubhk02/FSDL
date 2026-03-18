const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    people: {
        type: Number,
        required: true
    },
    totalprice: {
        type: Number,
        required: true
    }
}, 
{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
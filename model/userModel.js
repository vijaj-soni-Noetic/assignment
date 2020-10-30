const crypto = require('crypto');
const mongoose = require('mongoose');
const validate = require('validate');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type: String,
        required : [true, 'Name is required'],
        minlength: 4,
    },
    email:{
        type: String,
        required:[true, 'Please user email'],
        unique: true,
        lowercase: true
    },
    address:String,
    password:{
        type: String,
        required: [true, 'Enter password'],
        minlength: 4,
        select: false
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
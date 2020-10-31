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
userSchema.pre('save', async function(next) {
    // Only run this function if modified
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined
    next();
});
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
}

const User = mongoose.model('User', userSchema);

module.exports = User;

const {promisify} =require('util');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const UserModel = require('../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = id =>{
 return jwt.sign({id: id}, process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRES_IN
});
}
exports.signup = catchAsync(async (req, res, next) =>{
    const newUser = await UserModel.create({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        password: req.body.password
    });
    const token = signToken(newUser._id);
    res.status(201).json({
        status: 'success',
        token,
        data:{
            user: newUser
        }
    })

});

exports.Get = async(req, res, next) => {
    try {
        const features = new APIFeatures(UserModel.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

   const users = await features.query;
   
    res.status(200).json({
        result: users.length,
        status:"success",
        data: users
    })
    }
    catch (err) {
        res.status(400).json({
            status:"failed",
            message: err
        }) 
    }
};

exports.login = async( req, res, next)=> {
    try {
        const {email, password} =  req.body;

    if(!email || !password) {
      return  next(new AppError('Please provide email and password', 400));
    }

    const user = await UserModel.findOne({email: email}).select('+password');

    if(!user || !(await user.correctPassword(password, user.password))){
        return next( new AppError('Incorrect Email or password', 401))
    }
    
    const token =signToken(user._id);
        res.status(200).json({
            status: 'success',
            token
        });
    }
    catch (err) {
        res.status(400).json({
            status:"failed",
            message: err
        }) 
    }
};

exports.protect = catchAsync(async( req, res, next) => {
    let token;
    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')){
         token = req.headers.authorization.split(' ')[1];
    }
    console.log(token); 
    if(!token){
        return next( new AppError('Your are not logged In', 401));
    }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    console.log(decoded);

    const freshUser = await UserModel.findById(decoded.id);
    if(!freshUser){ 
        return next(new AppError('The user belonging to this does not exit', 401));
    }
    const user = await UserModel.findById(decoded.id);

   if(freshUser.changedAfter(decoded.iat)){
       return next(new AppError('usr changed password recently plz login again', 401))
   }
    
   req.user = freshUser;
    next();
});


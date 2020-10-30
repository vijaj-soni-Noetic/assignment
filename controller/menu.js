const mongoose = require('mongoose');
const Menu = require('../model/menu');


exports.createItem = async (req, res, next) =>{
    try {
        const newItem = await Menu.create({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            rating: req.body.rating,
            photo: req.body.photo
        });
        res.status(201).json({
            status: 'success',
            data:{
                user: newItem
            }
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }

};

exports.GetAll = async(req, res, next) => {
    try {
        
   const itemList = await Menu.find();
   
    res.status(200).json({
        result: itemList.length,
        status:"success",
        data: itemList
    })
    }
    catch (err) {
        res.status(400).json({
            status:"failed",
            message: err
        }) 
    }
};

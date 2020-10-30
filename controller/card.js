const mongoose = require('mongoose');
const Menu = require('../model/menu');


exports.Create = async (req, res, next) =>{
    try {
        const newItem = await Menu.create({
            _id: new mongoose.Types.ObjectId,
            menu_id: []
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

exports.Get = async(req, res, next) => {
    try {
        
   const itemList = await Menu.find().populate('Item');
   
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

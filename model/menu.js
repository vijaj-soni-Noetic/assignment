const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true,'Name is Required']
    },
    description: {
        type: String,
        required: [true,'description is Required']
    },
    price: {
        type: String,
        required: [true,'price is Required']
    },
    rating: String,
    photo:String,
    createdDate: {
        type: Date,
        default: Date.now()
    },
    updateDate: {
        type: Date,
        default: Date.now()
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
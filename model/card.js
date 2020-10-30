const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cart: {
        type: mongoose.Types.ObjectId,
        ref: 'Item',
        required: [true,'Item id is required']
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    customerID: Number,
    medicineID: Number,
    quantity: Number
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
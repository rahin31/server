const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerID: Number,
    medicineID: Number,
    quantity: Number,
    orderDate: Date
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
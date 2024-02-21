const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    medicineID: Number,
    expiryDate: Date,
    quantity: Number
});

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;
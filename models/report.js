const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    customerID: Number,
    medicineID: Number,
    quantity: Number,
    totalPrice: Number,
    orderDate: Date
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
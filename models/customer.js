const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    DoB: Date,
    city: String,
    roadNo: Number,
    houseNo: Number

});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
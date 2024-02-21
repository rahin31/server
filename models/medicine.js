const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    brandName: String,
    genericName: String,
    manufacturer: String,
    category: String,
    medicineType: String,
    buyingPrice: Number,
    sellingPrice: Number
});

const Medicine = mongoose.model('Medicine', medicineSchema);
module.exports = Medicine;
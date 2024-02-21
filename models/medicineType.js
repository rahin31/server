const mongoose = require('mongoose');

const medicineTypeSchema = new mongoose.Schema({
    name: String
});

const MedicineType = mongoose.model('MedicineType', medicineTypeSchema);
module.exports = MedicineType;
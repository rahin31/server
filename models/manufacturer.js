const mongoose = require('mongoose');

const manufacturerSchema = new mongoose.Schema({
    name: String,
    established: Number,
    headquarter: String
});

const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);
module.exports = Manufacturer;
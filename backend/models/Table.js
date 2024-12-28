const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  seats: { type: Number, required: true },
  combinable: { type: Boolean, default: false },
  booking: {
    name: { type: String, required: false },
    time: { type: Date, required: false },
    phone: { type: String, required: false },
  },
});

module.exports = mongoose.model('Table', TableSchema);

const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableNumber: { type: String, required: true },
  seats: { type: Number, required: true },
  isCombinable: { type: Boolean, default: false },
  coordinates: { type: [Number], required: true },
});

const floorPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tables: [tableSchema],
});

module.exports = mongoose.model('FloorPlan', floorPlanSchema);

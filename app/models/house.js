var mongoose = require('mongoose');

var houseSchema = mongoose.Schema({
  location: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  petsAllowed: { type: Boolean, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

module.exports = mongoose.model('House', houseSchema);

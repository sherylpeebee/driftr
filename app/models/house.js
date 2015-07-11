var mongoose = require('mongoose');

var houseSchema = mongoose.Schema({
  location: String,
  bedrooms: Number,
  bathrooms: Number,
  petsAllowed: Boolean,
  startDate: Date,
  endDate: Date
});

module.exports = mongoose.model('House', houseSchema);

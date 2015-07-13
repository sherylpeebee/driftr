var mongoose = require('mongoose');

var houseSchema = mongoose.Schema({
  userID: {type: String },
  location: { type: String },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  image: { type: String },
  startDate: { type: String },
  endDate: { type: String }
});

module.exports = mongoose.model('House', houseSchema);

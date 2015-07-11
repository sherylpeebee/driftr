var mongoose = require('mongoose');

var houseSchema = mongoose.Schema({
  location: String
});

module.exports = mongoose.model('House', houseSchema);

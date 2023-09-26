const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  level: Number, 
  progressBar: Number, 
 
});

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;
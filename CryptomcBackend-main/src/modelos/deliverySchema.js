const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId, 
  bikeId: mongoose.Schema.Types.ObjectId, 
  burgers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Burger' }], 
  success: Boolean, 
  reward: Number, 
  
});

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
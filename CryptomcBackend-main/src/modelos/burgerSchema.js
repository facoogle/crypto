const mongoose = require('mongoose');

const burgerSchema = new mongoose.Schema({
  name: String,
  rarity: String, 
  progressBar: Number, 
  
});

const Burger = mongoose.model('Burger', burgerSchema);

module.exports = Burger;
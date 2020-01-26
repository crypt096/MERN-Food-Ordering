const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating schema
const FoodSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  opis: {
    type: String,
    required: true
  },
  ocena: {
    type: String,
    required: true
  },
  cena: {
    type: String,
    required: true
  }
});

module.exports = Food = mongoose.model('food', FoodSchema);

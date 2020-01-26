const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating schema
const OrderSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['in progress', 'closed', 'canceled']
  },
  rating: {
    type: Number,
    required: true
  },
  place_of_delivery: {
    type: String,
    required: true
  }
});

module.exports = Order = mongoose.model('order', OrderSchema);

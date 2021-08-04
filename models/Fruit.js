const mongoose = require('mongoose');

// Schema - define what a fruit should look like
const fruitSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  color: { type: String, required: true },
  readyToEat: Boolean
})

// Fruit model - interface for interacting with Fruit data
// - allows us to create Fruits
const Fruit = mongoose.model('Fruit', fruitSchema);

// Fruit.create()
// Fruit.find()

module.exports = Fruit;
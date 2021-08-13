const mongoose = require('mongoose');

// Schema - define what a fruit should look like
const fruitSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  color: { type: String, required: true },
  readyToEat: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

/*
Example a fruit object
{
  name: 'apple',
  color: 'green',
  readyToEat: true,
  user: '2kd93l94fkskflsf03kf3ad'
}
*/

// Fruit model - interface for interacting with Fruit data
// - allows us to create Fruits
const Fruit = mongoose.model('Fruit', fruitSchema);

// Fruit.create()
// Fruit.find()

module.exports = Fruit;
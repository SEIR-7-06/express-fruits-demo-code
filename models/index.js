// - This file is where we set up our connection to Mongo DB
// - It is our entry point to working with our data

const mongoose = require('mongoose');

// Get the address to the Mongo database
const connectionString = 'mongodb://localhost:27017/fruitdb2';

// Fire off the connection to the Mongo database
// And deactives those mongoose deprication warnings
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Listen for when we connect,
// and when connected call the callback function
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${connectionString} 🥭`);
});

// Make the Fruit model available from this file
module.exports = {
  Fruit: require('./Fruit.js'),
  User: require('./User.js')
}
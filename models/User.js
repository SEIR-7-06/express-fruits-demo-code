const mongoose = require('mongoose');

// Schema - define what a fruit should look like
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})


const User = mongoose.model('User', userSchema);

// User.create()
// User.find()

module.exports = User;
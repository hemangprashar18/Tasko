const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  gender: String,
  name: Object,
  address: {
    city: String,
    state: String,
    country: String,
    street: Object,
  },
  email: String,
  age: Number,
  picture: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);

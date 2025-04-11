const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  bloodType: String,
  organ: String,
  contact: String,
  hospitalDocument: {
    type: String  // <-- Add this line
  }
});

module.exports = mongoose.model('Donor', donorSchema);

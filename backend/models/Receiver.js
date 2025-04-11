const mongoose = require('mongoose');

const receiverSchema = new mongoose.Schema({
  name: String,
  age: Number,
  bloodType: String,
  organ: String, // ✅ This line is important
  contact: String,
  hospitalDocument: String,
});

module.exports = mongoose.model('Receiver', receiverSchema);

// models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: String,
  password: String, // In real apps, always hash passwords
});

module.exports = mongoose.model('Admin', adminSchema);

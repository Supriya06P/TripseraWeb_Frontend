const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  agencyName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // Store hashed version only!
  role: { type: String, default: 'user' }
});

module.exports = mongoose.model('User', UserSchema);
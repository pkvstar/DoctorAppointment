const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String },
  age: { type: Number },
  bloodType: { type: String },
  address: { type: String },
  role: { type: String, default: 'patient' }
});

module.exports = mongoose.model('Patient', patientSchema); 
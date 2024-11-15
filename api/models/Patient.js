const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String , required: true},
  age: { type: Number , required: true ,min:0 ,max:150 },
  bloodType: { type: String , required: true},
  address: { type: String , required: true},
  role: { type: String, default: 'patient' }
});

module.exports = mongoose.model('Patient', patientSchema); 
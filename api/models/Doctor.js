// const mongoose = require('mongoose');

// const doctorSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   image: { type: String },
//   speciality: { type: String, required: true },
//   degree: { type: String, required: true },
//   experience: { type: String, required: true },
//   about: { type: String },
//   fees: { type: Number, required: true },
//   address: {
//     line1: { type: String },
//     line2: { type: String }
//   },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   isVerified: { type: Boolean, default: false },
//   availability: [{
//     day: { type: String, required: true },
//     slots: [{ type: String, required: true }]
//   }]
// });

// module.exports = mongoose.model('Doctor', doctorSchema); 
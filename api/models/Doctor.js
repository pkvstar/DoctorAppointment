const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  speciality: {
    type: String,
    required: true,
    enum: [
      'General physician', 
      'Gynecologist', 
      'Dermatologist', 
      'Pediatricians', 
      'Neurologist', 
      'Gastroenterologist', 
      'Dentist'
    ]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  consultationFee: {
    type: Number,
    required: true,
    min: 0
  },
  address: {
    type: String,
    required: true
  },
  about: {
    type: String,
    trim: true
  },
  gender:{
    type: String,
    required: true,
  },
  availability: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    slots: [String]
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Doctor', DoctorSchema);





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
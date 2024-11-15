// const mongoose = require('mongoose');

// const appointmentSchema = new mongoose.Schema({
//   doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
//   patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
//   date: { type: Date, required: true },
//   time: { type: String, required: true },
//   status: { type: String, enum: ['pending', 'accepted', 'rejected', 'completed'], default: 'pending' }
// });

// module.exports = mongoose.model('Appointment', appointmentSchema); 
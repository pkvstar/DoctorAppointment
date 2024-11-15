// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const Patient = require('../models/Patient');
// const router = express.Router();

// const JWT_SECRET = 'your_jwt_secret'; // Use a secure secret in production

// // Register Route
// router.post('/register', async (req, res) => {
//   const { fullName, email, password, gender, age, bloodType, address } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const patient = new Patient({
//       fullName,
//       email,
//       password: hashedPassword,
//       gender,
//       age,
//       bloodType,
//       address
//     });
//     await patient.save();
//     res.status(201).json({ message: 'Patient registered successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error registering patient' });
//   }
// });

// // Login Route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const patient = await Patient.findOne({ email });
//     if (!patient) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, patient.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId: patient._id, role: patient.role }, JWT_SECRET, { expiresIn: '1h' });
//     res.cookie('token', token, { httpOnly: true });
//     res.json({ message: 'Logged in successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error logging in' });
//   }
// });

// // Logout Route
// router.post('/logout', (req, res) => {
//   res.clearCookie('token');
//   res.json({ message: 'Logged out successfully' });
// });

// module.exports = router; 
// const express = require('express');
// const authMiddleware = require('../middleware/auth');
// const Patient = require('../models/Patient');
// const router = express.Router();

// // Fetch patient profile
// router.get('/profile', authMiddleware, async (req, res) => {
//   try {
//     const patient = await Patient.findById(req.user.userId).select('-password');
//     if (!patient) {
//       return res.status(404).json({ error: 'Patient not found' });
//     }
//     res.json(patient);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching patient details' });
//   }
// });

// module.exports = router; 
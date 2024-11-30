const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connection = require('./config/connection');
const path = require('path');
const Patient = require('./models/Patient');
const User = require('./models/User');
const Admin = require('./models/Admin');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');
const bcrypt = require('bcrypt');

const jwtSecret = "pkv"
const PORT = 5000;

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}));

//? Connect to MongoDB database
try {
  connection();
} catch (error) {
  console.log('Database connection error:');
}connection();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));


const jwt = require('jsonwebtoken');

//? LOGIN FOR ALL
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' }); 
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, jwtSecret);
    res.cookie('token', token);
    
    return res.status(200).json({ 
      message: 'Logged in successfully',
      role: user.role
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

//? Authenticate the user using cookie
app.get('/api/check-auth', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ isAuthenticated: false });

  jwt.verify(token, jwtSecret, async (err, data) => {
    if (err) return res.json({ isAuthenticated: false });
    
    try {
      if (data.role === 'patient') {
        const patient = await Patient.findOne({ email: data.email });
        if (!patient) {
          return res.json({ isAuthenticated: false });
        }
        return res.json({ 
          isAuthenticated: true, 
          role: data.role, 
          dataRole: patient //my whole data according to role
        });
      }
      else if (data.role === 'doctor') {
        const doctor = await Doctor.findOne({ email: data.email });
        if (!doctor) {
          return res.json({ isAuthenticated: false });
        }
        return res.json({
          isAuthenticated: true,
          role: data.role,
          dataRole: doctor
        });
      }
      else {
        const admin = await Admin.findOne({ email: data.email });
        if (!admin) {
          return res.json({ isAuthenticated: false });
        }
        return res.json({ 
          isAuthenticated: true, 
          role: data.role, 
          dataRole: admin
        });
      }
    } catch (error) {
      console.error('Auth check error:', error);
      return res.json({ isAuthenticated: false });
    }
  });
});

//? LOGOUT
app.post('/api/logout', (req, res) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error logging out' });
  }
});

//? Register for patient
app.post('/api/register',async (req,res)=>{
  const { fullName, email, password, gender, age, bloodType, address } = req.body;
  if (!fullName || !email || !password || !gender || !age || !bloodType || !address) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }
  const checkExist = await User.findOne({email});
  if(checkExist){
    return res.status(400).json({ message: 'Email is already registered' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await Patient.create({
    fullName, email, password: hashedPassword, gender, age, bloodType, address ,role:"patient"
  })
  await User.create({
    email, password: hashedPassword, role:"patient"
  })
  return res.status(201).json({ message: 'Patient registered successfully' });
})

//? Register for ADMIN
app.post('/api/admin/register',async (req,res)=>{
  const {name , email , password} = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }
  const checkExist = await User.findOne({email});
  if(checkExist){
    return res.status(400).json({ message: 'Email is already registered' });
  }
  try{
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email, password: hashedPassword, role:"admin"
    })
    await Admin.create({
      name, email, password: hashedPassword
    })
    return res.status(201).json({ message: 'Admin registered successfully' });
  }
  catch(err){
    return res.status(500).json({ message: 'Error in registering admin' });
  }
})

//? REGISTER for Doctor
app.post('/api/newDoctor/register', async (req, res) => {
  try {
    const {
      name,
      speciality,
      email,
      password,
      education,
      experience,
      consultationFee,
      address,
      about,
      gender,
      availability
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor with this email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new doctor document
    const newDoctor =  await Doctor.create({
      name,
      speciality,
      email,
      password: hashedPassword,
      education,
      experience: Number(experience),
      consultationFee: Number(consultationFee),
      address,
      about,
      gender,
      availability: JSON.parse(availability || '[]')
    });

    await User.create({
      email,
      password: hashedPassword,
      role: 'doctor',
    });

    res.status(201).json({ 
      message: 'Doctor added successfully', 
      doctorId: newDoctor._id 
    });
  } catch (error) {
    console.error('Doctor creation error:', error);
    res.status(500).json({ 
      message: 'Error adding doctor', 
      error: error.message 
    });
  }
});

//? fetch doctors all
app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    console.error('Fetching doctors error:', error);
    res.status(500).json({ message: 'Error fetching doctors' });
  }
});

//? fetch doctor by id
app.get('/doctor/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    console.error('Fetching doctor error:', error);
    res.status(500).json({ message: 'Error fetching doctor' });
  }
});

//? fetch all patients
app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    console.error('Fetching patients error:', error);
    res.status(500).json({ message: 'Error fetching patients' });
  }
});

//? Create an appointment
app.post('/api/appointments', async (req, res) => {
  const { doctorId, patientId, date, time } = req.body;
  try {
    const appointment = await Appointment.findOne({doctor:doctorId , date: date ,time: time});
    if(appointment){
      return res.status(200).json({ message: 'Appointment already exists for this date and time' });
    }
    else{
      const newAppointment = await Appointment.create({
        doctor: doctorId,
        patient: patientId,
        date,
        time,
        status: 'pending'
      });
      res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
    }
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Error creating appointment' });
  }
});

//? fetch appointment information for admin
app.get('/api/adminAppointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('doctor').populate('patient');
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});

//? Fetch appointments for a patient
app.get('/api/appointments/:patientId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.params.patientId }).populate('doctor');
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});

//? fetch appointments for a doctor
app.get('/api/doctorAppointments/:doctorId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.params.doctorId }).populate('patient');
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    res.status(500).json({ message: 'Error fetching doctor appointments' });
  }
});

//? Update an appointment status
app.put('/api/appointments/:appointmentId', async (req, res) => {
  const { status } = req.body;
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.appointmentId, { status }, { new: true });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Appointment status updated successfully', appointment });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({ message: 'Error updating appointment status' });
  }
});

//? Get Appointment info for both doctor and patient for chat
app.get('/api/appointments/:appointmentId/chat', async (req, res) => {
  const {appointmentId} = req.params;
  try{
    const appointment = await Appointment.findOne({_id:appointmentId});
    res.status(200).json({
      success: true,
      messages: appointment.messages || [],
    });
  }catch(err){
    console.error('Error getting appointment messages', err);
    res.status(500).json({ message: 'Error getting appointment messages' });
  }
})

//? Post Appointment info for both doctor and patient for chat
app.post('/api/appointments/:appointmentId/chat', async (req, res) => {
  const { appointmentId } = req.params;
  const { sender, message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message cannot be empty' });
  }

  try {
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    appointment.messages.push({ sender, message });
    await appointment.save();

    res.status(200).json({ message: 'Message sent successfully', messages: appointment.messages });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});


//? PORT listen
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
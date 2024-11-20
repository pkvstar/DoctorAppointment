const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connection = require('./config/connection');
const path = require('path');
const Patient = require('./models/Patient');
const User = require('./models/User');
const Admin = require('./models/Admin');

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

//? Register
app.post('/api/register',async (req,res)=>{
  const { fullName, email, password, gender, age, bloodType, address } = req.body;
  if (!fullName || !email || !password || !gender || !age || !bloodType || !address) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }
  const checkExist = await User.findOne({email});
  if(checkExist){
    return res.status(400).json({ message: 'Email is already registered' });
  }
  await Patient.create({
    fullName, email, password, gender, age, bloodType, address ,role:"patient"
  })
  await User.create({
    email, password , role:"patient"
  })
  return res.status(201).json({ message: 'Patient registered successfully' });
})

//? registeration for admin not to shown on frontend only call using postman
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
    await User.create({
      email, password, role:"admin"
    })
    await Admin.create({
      name, email, password
    })
    return res.status(201).json({ message: 'Admin registered successfully' });
  }
  catch(err){
    return res.status(500).json({ message: 'Error in registering admin' });
  }
})


//? LOGIN
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' }); 
    }

    if (user.password !== password) { //! i will use bcrypt here
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
        // Handle doctor logic here
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

//? PORT listen
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
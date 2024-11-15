import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import axios from 'axios';
// import { register } from '../services/authService';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    gender: '',
    age: '',
    bloodType: '',
    address: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // try {
    //     const response = await axios.post(`${API_URL}/register`, userData);
    //     return response.data;
    //   } catch (error) {
    //     throw error.response.data;
    //   }
  const handleRegister = async () => {
    try {
      // /api/register // Send formData directly
      const response = await axios.post("http://localhost:5000/api/register",formData);
      toast.success('Registered successfully');
      navigate('/login'); // Redirect to login
    } catch (error) {
      toast.error(error.error || 'Registration failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className='w-full flex justify-center items-center'>
        <div id="register-main" className='shadow-2xl flex flex-col gap-2 w-[22rem] h-auto mt-10 p-10 font-Outfit font-medium rounded-xl'>
          <h1 className='text-2xl mb-3'>Create an account</h1>
          <label className='text-gray-600 font-light' htmlFor="fullName">Enter Full Name</label>
          <input
            className='border-2 border-gray-300 px-2 py-1 outline-none rounded-md mb-2'
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
          <label className='text-gray-600 font-light' htmlFor="email">Enter Email</label>
          <input
            className='border-2 border-gray-300 px-2 py-1 outline-none rounded-md mb-2'
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <label className='text-gray-600 font-light' htmlFor="password">Enter Password</label>
          <input
            type="password"
            className='mb-3 border-2 border-gray-300 px-2 py-1 outline-none rounded-md'
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <label className='text-gray-600 font-light' htmlFor="gender">Gender</label>
          <input
            className='border-2 border-gray-300 px-2 py-1 outline-none rounded-md mb-2'
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          />
          <label className='text-gray-600 font-light' htmlFor="age">Age</label>
          <input
            type="number"
            className='border-2 border-gray-300 px-2 py-1 outline-none rounded-md mb-2'
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
          />
          <label className='text-gray-600 font-light' htmlFor="bloodType">Blood Type</label>
          <input
            className='border-2 border-gray-300 px-2 py-1 outline-none rounded-md mb-2'
            id="bloodType"
            name="bloodType"
            value={formData.bloodType}
            onChange={handleInputChange}
          />
          <label className='text-gray-600 font-light' htmlFor="address">Address</label>
          <input
            className='border-2 border-gray-300 px-2 py-1 outline-none rounded-md mb-2'
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <button className='p-2 bg-darkBlue rounded-lg text-white mb-5' onClick={handleRegister}>Register</button>
          <p>login your account - <a onClick={() => navigate("/login")} className='cursor-pointer text-blue-600 decoration-1 underline'>Click here</a></p>
        </div>
      </div>
    </>
  );
};

export default Register;
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../Components/Navbar';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login , isAuthenticated} = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await login({ email, password });
      toast.success('Logged in successfully');
      if (response.role === 'patient') {
        navigate('/myProfile');
      }
      else if(response.role === 'admin'){
        navigate('/admin-dashboard');
      }
      else{
        toast.error('Invalid Role');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <Navbar />
      { !isAuthenticated ? 
      <div className='w-full flex justify-center items-center'>
        <div id="login-main" className='shadow-2xl flex flex-col gap-2 w-[22rem] h-[53vh] mt-24 p-10 font-Outfit font-medium rounded-xl'>
          <h1 className='text-2xl mb-3'>Login</h1>
          <label className='text-gray-600 font-light' htmlFor="email">Enter Email</label>
          <input
            className='border-2 border-gray-300 px-2 py-1 outline-none rounded-md mb-2'
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className='text-gray-600 font-light' htmlFor="password">Enter Password</label>
          <input
            type="password"
            className='mb-3 border-2 border-gray-300 px-2 py-1 outline-none rounded-md'
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='p-2 bg-darkBlue rounded-lg text-white mb-5' onClick={handleLogin}>Login</button>
          <p>create a new account - <a onClick={() => navigate("/register")} className='cursor-pointer text-blue-600 decoration-1 underline'>Click here</a></p>
        </div>
      </div> :
      <h1>Already Logged In</h1>
      }
    </>
  );
};

export default Login;
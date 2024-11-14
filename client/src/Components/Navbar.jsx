import React, { useContext } from 'react';
import NavLogo from "../assets/Navbar/HEALTHLINK.png";
import { AuthContext } from '../context/AuthContext';
import DownArrow from "../assets/Navbar/DownArrow.png";
import ProfilePic from "../assets/Navbar/profilePic.png";
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className='text-sm flex justify-between items-center font-Poppins py-4 mb-5 border-b-slate-500 border-b'>
      <img src={NavLogo} className='w-48 cursor-pointer' alt="HealthLink Logo" />
      <div className='hidden md:flex items-center gap-8 font-medium'>
        <NavLink to="/">
          <p>HOME</p>
          <hr className='hidden border-none outline-none h-0.5 bg-skyBlue m-auto w-3/4' alt="Home Link" />
        </NavLink>
        <NavLink to="/doctors">
          <p>ALL DOCTORS</p>
          <hr className='hidden border-none outline-none h-0.5 bg-skyBlue m-auto w-3/4' alt="All Doctors Link" />
        </NavLink>
        <NavLink to="/contact">
          <p>CONTACT US</p>
          <hr className='hidden border-none outline-none h-0.5 bg-skyBlue m-auto w-3/4' alt="Contact Us Link" />
        </NavLink>
      </div>
      <div className='flex items-center'>
        {isAuthenticated ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img src={ProfilePic} className='rounded-full w-8' alt="Profile" />
            <img src={DownArrow} className='scale-75' alt="Dropdown Arrow" />
            <div className='pt-16 absolute top-0 right-0 z-10 text-sm font-medium text-slate-600 hidden group-hover:block'>
              <div className='min-w-40 bg-stone-300 rounded-lg flex flex-col gap-3 p-3'>
                <p onClick={() => navigate('/myProfile')} className='hover:text-black'>My Profile</p>
                <p onClick={() => navigate('/myAppointments')} className='hover:text-black'>My Appointment</p>
                <p onClick={logout} className='hover:text-red-600'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate("/register")} className='hidden md:block active:scale-90 bg-darkBlue px-8 py-3 text-white rounded-full font-light'>Create account</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
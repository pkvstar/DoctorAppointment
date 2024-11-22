import React from 'react';
import { Link } from 'react-router-dom';
import NavLogo from "../assets/Navbar/HEALTHLINK.png"

const DoctorNavbar = () => {
  return (
    <nav className="p-4 border-b border-gray-300">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={NavLogo} alt="HealthLink Logo" className="w-48 max-sm:w-24" />
          <div className="text-gray-500 font-semibold text-sm border-2 border-gray-500 rounded-full px-3 py-1 max-sm:text-[0.6rem] max-sm:border-none">doctor</div>
          <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer h-6 w-6 text-red-500 font-bold" viewBox="0 0 24 24" fill="currentColor" strokeWidth="2">
            <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z" />
          </svg>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/doctor-dashboard" className="flex items-center gap-2 text-gray-600 hover:text-darkBlue">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <span className="hidden md:inline">Dashboard</span>
          </Link>
          <Link to="/doctor-appointments" className="flex items-center gap-2 text-gray-600 hover:text-darkBlue">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="hidden md:inline">Appointments</span>
          </Link>
          <Link to="/doctor-profile" className="flex items-center gap-2 text-gray-600 hover:text-darkBlue">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="hidden md:inline">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default DoctorNavbar; 
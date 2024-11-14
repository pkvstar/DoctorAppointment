import React from 'react';
import { Link } from 'react-router-dom';
import NavLogo from "../assets/Navbar/HEALTHLINK.png"

const AdminNavbar = () => {
  return (
    <nav className="p-4 border-b border-gray-300">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={NavLogo} alt="HealthLink Logo" className="w-48 max-sm:w-28" />
          <div className="text-gray-500 font-semibold text-sm border-2 border-gray-500 rounded-full px-3 py-1 max-sm:text-[0.6rem] max-sm:border-none">admin portal</div>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/admin-dashboard" className="flex items-center gap-2 text-gray-600 hover:text-darkBlue">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <span className="hidden md:inline">Dashboard</span>
          </Link>
          <Link to="/admin-appointments" className="flex items-center gap-2 text-gray-600 hover:text-darkBlue">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="hidden md:inline">All Appointments</span>
          </Link>
          <Link to="/admin-doctorsList" className="flex items-center gap-2 text-gray-600 hover:text-darkBlue">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="hidden md:inline">Doctors List</span>
          </Link>
          <Link to="/admin-doctorAdd" className="flex items-center gap-2 text-gray-600 hover:text-darkBlue">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
            </svg>
            <span className="hidden md:inline">Add Doctor</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar; 
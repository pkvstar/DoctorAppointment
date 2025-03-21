import React, { useState , useEffect } from 'react'
import AdminNavbar from '../../Components/AdminNavbar'
import doctorProfile from '../../assets/doctor.jpg'
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AdminAllDoctors = () => {
  const { isAuthenticated, userData ,userRole , loading , doctors } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if(loading) return;
    if(!isAuthenticated){
      navigate('/login');
    }
    if(userRole !== 'admin'){
      toast.error('You are not an admin');
      navigate('/');
    }
  }, [isAuthenticated, userRole, navigate, loading , doctors]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  return (
    <div>
      <AdminNavbar />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">All Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center space-x-4 mb-3">
                <img 
                  src={doctorProfile} 
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.speciality}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminAllDoctors
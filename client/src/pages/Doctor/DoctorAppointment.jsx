import React, { useState, useEffect } from 'react';
import DoctorNavbar from '../../components/DoctorNavbar';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'

const DoctorAppointment = () => {
  const { isAuthenticated, userRole, loading , userData } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/doctorAppointments/${userData._id}`);
      console.log(response)
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to load appointments');
    }
  };
  const changeAppointmentStatus = async (id,status)=>{
    try {
      const response = await axios.put(`http://localhost:5000/api/appointments/${id}`, {status});
      toast.success('Appointment status changed successfully');
      fetchAppointments();
    } catch (error) {
      console.error('Error changing appointment status:', error);
      toast.error('Failed to change appointment status');
    }
  }
  useEffect(() => {
    if (loading) return; 

    if (!isAuthenticated) {
      navigate('/login');
    } else if (userRole !== 'doctor') {
      toast.error('You are not a doctor');
      navigate('/');
    }
    else{
      fetchAppointments();
    }
  }, [isAuthenticated, userRole, navigate, loading , userData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <DoctorNavbar />
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-darkBlue font-Poppins">
            Appointment Requests
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-skyBlue bg-opacity-10">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-darkBlue">Patient Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-darkBlue">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-darkBlue">Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-darkBlue">Age</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-darkBlue">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr 
                    key={appointment.id} 
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-700">{appointment.patient.fullName}</td>
                    <td className="px-6 py-4 text-gray-600">{new Date(appointment.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-gray-600">{appointment.time}</td>
                    <td className="px-6 py-4 text-gray-600">{appointment.patient.age}</td>
                    <td className="px-6 py-4">
                      {appointment.status === 'pending' ? (
                        <div className="space-x-3">
                          <button 
                            onClick={() => changeAppointmentStatus(appointment._id,'accepted')}
                            className="bg-green-100 text-green-800 hover:bg-green-200 px-4 py-2 rounded-md transition-colors duration-200 font-medium text-sm"
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => changeAppointmentStatus(appointment._id,'rejected')}
                            className="bg-red-100 text-red-800 hover:bg-red-200 px-4 py-2 rounded-md transition-colors duration-200 font-medium text-sm"
                          >
                            Reject
                          </button>
                        </div>
                      ) : appointment.status === 'accepted' ? (
                        <div className="flex items-center gap-2">
                          <span className="text-green-500 font-medium">Accepted</span>
                          <button className="text-skyBlue hover:text-darkBlue transition-colors" onClick={() => navigate(`/chat/${appointment._id}`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <span className="text-red-500 font-medium">Rejected</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;
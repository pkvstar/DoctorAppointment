import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import profileImage from '../assets/doctor.jpg'

const MyAppointments = () => {
  const { isAuthenticated, userData, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      navigate('/login');
    }
    if (userRole !== 'patient') {
      toast.error('You are not a Patient');
      navigate('/');
    } else {
      fetchAppointments();
    }
  }, [isAuthenticated, userRole, navigate, loading]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/appointments/${userData._id}`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to load appointments');
    }
  };
  const changeAppointmentStatus = async (id)=>{
    try {
      const response = await axios.put(`http://localhost:5000/api/appointments/${id}`, {status: 'cancelled'});
      toast.success('Appointment status changed successfully');
      fetchAppointments();
    } catch (error) {
      console.error('Error changing appointment status:', error);
      toast.error('Failed to change appointment status');
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className='w-full px-4 py-8'>
        <div className='font-Outfit'>
          <h2 className='text-3xl font-semibold mb-8 text-center'>My Appointments</h2>
          <div className='flex flex-col gap-6 max-w-[1200px] mx-auto'>
            {appointments.map((appointment) => (
              <div 
                key={appointment._id} 
                className='bg-white hover:bg-gray-50 transition-all duration-300 rounded-2xl p-6 border-l-4 border-skyBlue hover:border-darkBlue'
              >
                <div className='flex flex-col md:flex-row gap-6'>
                  <div className='w-40 h-40 flex-shrink-0 rounded-2xl overflow-hidden bg-skyBlue/10 p-2'>
                    <img 
                      src={profileImage}
                      alt={appointment.doctor.name}
                      className='w-full h-full object-cover rounded-xl'
                    />
                  </div>
                  <div className='flex-1'>
                    <div className='flex flex-col md:flex-row justify-between gap-4'>
                      <div>
                        <h3 className='text-2xl font-medium text-darkBlue'>{appointment.doctor.name}</h3>
                        <div className='flex items-center gap-2 mt-1'>
                          <p className='text-gray-600'>{appointment.doctor.education} - {appointment.doctor.speciality}</p>
                          <span className='px-3 py-1 bg-skyBlue/10 text-darkBlue rounded-full'>
                            {appointment.doctor.experience} years
                          </span>
                        </div>
                        <div className='mt-4 flex flex-wrap gap-4'>
                          <div className='bg-gray-100 px-4 py-2 rounded-lg'>
                            <p className='text-sm text-gray-500'>Date</p>
                            <p className='font-medium'>{new Date(appointment.date).toLocaleDateString()}</p>
                          </div>
                          <div className='bg-gray-100 px-4 py-2 rounded-lg'>
                            <p className='text-sm text-gray-500'>Time</p>
                            <p className='font-medium'>{appointment.time}</p>
                          </div>
                          <div className='bg-gray-100 px-4 py-2 rounded-lg'>
                            <p className='text-sm text-gray-500'>Fee</p>
                            <p className='font-medium'>₹{appointment.doctor.consultationFee}</p>
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-col gap-3 min-w-[140px]'>
                        <div className={`px-6 py-3 rounded-xl text-center font-medium ${appointment.status === 'pending' ? 'text-yellow-700' : appointment.status === 'accepted' || appointment.status === 'completed' ? 'text-green-700' : 'text-red-700'}`}>
                          {appointment.status}
                        </div>
                        {(appointment.status === 'accepted') ? 
                          <button className='px-6 py-3 border-2 border-blue-500 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors' onClick={() => console.log('Chat functionality not implemented yet.')}>
                            Chat
                          </button>
                         :
                        (appointment.status === 'cancelled' || appointment.status === 'rejected') ? 
                          null
                         :
                        <button className='px-6 py-3 border-2 border-red-500 text-red-500 hover:bg-red-50 rounded-xl transition-colors' onClick={() => changeAppointmentStatus(appointment._id)}>
                        Cancel
                        </button>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyAppointments;
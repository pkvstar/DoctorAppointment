import React, { useState, useEffect } from 'react'
import AdminNavbar from '../../Components/AdminNavbar'
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const AdminAppointment = () => {
  const { isAuthenticated, userData ,userRole , loading } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(loading) return;
    if(!isAuthenticated){
      navigate('/login');
    }
    if(userRole !== 'admin'){
      toast.error('You are not an admin');
      navigate('/');
    }else{
      fetchAppointments();
    }
  }, [isAuthenticated, userRole, navigate, loading]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/adminAppointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to load appointments');
    }
  };
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
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-darkBlue">All Appointments</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Doctor Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Patient Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.map((appointment, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{appointment.doctor.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{appointment.patient.fullName}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${(appointment.status === 'completed' || appointment.status === 'accepted') ? 'bg-green-100 text-green-800' : 
                        appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}>
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {appointments.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No appointments found
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminAppointment
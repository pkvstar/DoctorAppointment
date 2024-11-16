import React, { useState, useEffect } from 'react'
import AdminNavbar from '../../Components/AdminNavbar'
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const AdminAppointment = () => {
  const { isAuthenticated, userData ,userRole } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!isAuthenticated){
      navigate('/login');
    }
    if(userRole !== 'admin'){
      toast.error('You are not an admin');
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  const [appointments, setAppointments] = useState([
    {
      doctorName: "Dr. Sarah Wilson",
      patientName: "John Smith", 
      status: "Completed"
    },
    {
      doctorName: "Dr. Michael Chen",
      patientName: "Emily Johnson",
      status: "Pending"
    },
    {
      doctorName: "Dr. Jessica Patel",
      patientName: "Robert Williams",
      status: "Cancelled"
    },
    {
      doctorName: "Dr. David Kim",
      patientName: "Maria Garcia",
      status: "Completed"
    },
    {
      doctorName: "Dr. Rachel Brown",
      patientName: "James Anderson",
      status: "Pending"
    }
  ])

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
                  <td className="px-6 py-4 text-sm text-gray-800">{appointment.doctorName}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{appointment.patientName}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${appointment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
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
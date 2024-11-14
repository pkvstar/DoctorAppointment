import React, { useState } from 'react';
import DoctorNavbar from '../../components/DoctorNavbar';

const DoctorAppointment = () => {
  // This would typically come from an API
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      date: '2024-03-20',
      time: '10:00 AM',
      age: 35,
      status: 'pending'
    },
    {
        id: 2,
        patientName: 'Johny man',
        date: '2024-03-20',
        time: '11:00 AM',
        age: 30,
        status: 'pending'
      },
      {
        id: 3,
        patientName: 'Sarah',
        date: '2024-03-22',
        time: '09:00 AM',
        age: 26,
        status: 'pending'
      },
    // Add more appointments as needed
  ]);

  const handleAppointmentStatus = (id, status) => {
    setAppointments(appointments.map(app => 
      app.id === id ? {...app, status} : app
    ));
  };

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
                    <td className="px-6 py-4 font-medium text-gray-700">{appointment.patientName}</td>
                    <td className="px-6 py-4 text-gray-600">{appointment.date}</td>
                    <td className="px-6 py-4 text-gray-600">{appointment.time}</td>
                    <td className="px-6 py-4 text-gray-600">{appointment.age}</td>
                    <td className="px-6 py-4">
                      {appointment.status === 'pending' ? (
                        <div className="space-x-3">
                          <button 
                            onClick={() => handleAppointmentStatus(appointment.id, 'accepted')}
                            className="bg-green-100 text-green-800 hover:bg-green-200 px-4 py-2 rounded-md transition-colors duration-200 font-medium text-sm"
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => handleAppointmentStatus(appointment.id, 'rejected')}
                            className="bg-red-100 text-red-800 hover:bg-red-200 px-4 py-2 rounded-md transition-colors duration-200 font-medium text-sm"
                          >
                            Reject
                          </button>
                        </div>
                      ) : appointment.status === 'accepted' ? (
                        <div className="flex items-center gap-2">
                          <span className="text-green-500 font-medium">Accepted</span>
                          <button className="text-skyBlue hover:text-darkBlue transition-colors">
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
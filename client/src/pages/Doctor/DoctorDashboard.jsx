import React from 'react';
import DoctorNavbar from '../../components/DoctorNavbar';

const DoctorDashboard = () => {
  const dashboardStats = {
    totalEarnings: 25000,
    totalAppointments: 150,
    totalPatients: 75,
  };

  return (
    <div>
      <DoctorNavbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-500">Total Earnings</h2>
            <p className="text-2xl font-bold">${dashboardStats.totalEarnings}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-500">Total Appointments</h2>
            <p className="text-2xl font-bold">{dashboardStats.totalAppointments}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-gray-500">Total Patients</h2>
            <p className="text-2xl font-bold">{dashboardStats.totalPatients}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
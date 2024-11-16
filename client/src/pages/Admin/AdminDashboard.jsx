import AdminNavbar from '../../Components/AdminNavbar'
import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
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
//   if (!isAuthenticated) {
//     return null;
//   }
//   if(userRole !== 'admin'){
//     toast.error('You are not an Admin');
//     navigate('/login');
//   }
  if (!userData) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </>
    );
  }
  return (
    <div>
        <AdminNavbar />
        <div className="container mx-auto mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Patients Card */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Total Patients</p>
                            <h3 className="text-2xl font-semibold mt-2">1,234</h3>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Total Doctors Card */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Total Doctors</p>
                            <h3 className="text-2xl font-semibold mt-2">48</h3>
                        </div>
                        <div className="bg-green-100 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Total Appointments Card */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Total Appointments</p>
                            <h3 className="text-2xl font-semibold mt-2">3,879</h3>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard
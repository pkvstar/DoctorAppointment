import React,{ useEffect } from 'react';
import DoctorNavbar from '../../components/DoctorNavbar';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import doctorProfile from '../../assets/doctor.jpg'
const DoctorProfile = () => {
  const { isAuthenticated, userRole, loading , userData } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return; 

    if (!isAuthenticated) {
      navigate('/login');
    } else if (userRole !== 'doctor') {
      toast.error('You are not a doctor');
      navigate('/');
    }
  }, [isAuthenticated, userRole, navigate, loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }


  return (
    <div>
      <DoctorNavbar />
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold font-Poppins">Doctor Profile</h1>
            <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-green-600">Verified</span>
            </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-skyBlue">
              <img 
                src={doctorProfile}
                alt="Doctor Profile"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 font-Poppins">
              <div className="grid md:grid-cols-2 max-sm:flex max-sm:flex-col gap-6">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h2 className="text-gray-500 text-sm">Name</h2>
                  <p className="font-medium text-darkBlue">{userData.name}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h2 className="text-gray-500 text-sm">Gender</h2>
                  <p className="font-medium text-darkBlue">{userData.gender}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h2 className="text-gray-500 text-sm">Specialization</h2>
                  <p className="font-medium text-darkBlue">{userData.speciality}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h2 className="text-gray-500 text-sm">Experience</h2>
                  <p className="font-medium text-darkBlue">{userData.experience}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h2 className="text-gray-500 text-sm">Education</h2>
                  <p className="font-medium text-darkBlue">{userData.education}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h2 className="text-gray-500 text-sm">Email</h2>
                  <p className="font-medium text-darkBlue">{userData.email}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg col-span-2">
                  <h2 className="text-gray-500 text-sm">Address</h2>
                  <p className="font-medium text-darkBlue">{userData.address}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h2 className="text-gray-500 text-sm">Consultation Fee</h2>
                  {/* <div className="flex items-center gap-3"> */}
                    <p className="font-medium text-darkBlue">₹{userData.consultationFee}</p>
                  {/* </div> */}
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-darkBlue">Availability</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userData.availability.map((el,index)=>{
                    if(el.slots.length > 0 ){
                      return <div className="bg-slate-50 p-4 rounded-lg" key={index}>
                        <h3 className="font-medium text-darkBlue">{el.day}</h3>
                        {el.slots.map((el)=><p className="text-gray-600" key={index}>{el}</p>)}
                      </div>
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile


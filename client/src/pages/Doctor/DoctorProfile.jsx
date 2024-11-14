import React from 'react';
import DoctorNavbar from '../../components/DoctorNavbar';

const DoctorProfile = () => {
  // This would typically come from an API
  const doctorInfo = {
    name: 'Dr. John Smith',
    specialization: 'Cardiologist',
    experience: '15 years',
    education: 'MD - Cardiology, MBBS',
    email: 'john.smith@example.com',
    phone: '+1 234 567 8900',
    address: '123 Medical Center, Healthcare Street',
    consultationFee: 150,
    isVerified: true,
  };

  return (
    <div>
      <DoctorNavbar />
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold font-Poppins">Doctor Profile</h1>
          {doctorInfo.isVerified ? (
            <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-green-600">Verified</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-yellow-600">Pending</span>
            </div>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-skyBlue">
              <img 
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="Doctor Profile"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 font-Poppins">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h2 className="text-gray-500 text-sm">Name</h2>
                  <p className="font-medium text-darkBlue">{doctorInfo.name}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h2 className="text-gray-500 text-sm">Specialization</h2>
                  <p className="font-medium text-darkBlue">{doctorInfo.specialization}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h2 className="text-gray-500 text-sm">Experience</h2>
                  <p className="font-medium text-darkBlue">{doctorInfo.experience}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h2 className="text-gray-500 text-sm">Education</h2>
                  <p className="font-medium text-darkBlue">{doctorInfo.education}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h2 className="text-gray-500 text-sm">Email</h2>
                  <p className="font-medium text-darkBlue">{doctorInfo.email}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h2 className="text-gray-500 text-sm">Phone</h2>
                  <p className="font-medium text-darkBlue">{doctorInfo.phone}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg col-span-2">
                  <h2 className="text-gray-500 text-sm">Address</h2>
                  <p className="font-medium text-darkBlue">{doctorInfo.address}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h2 className="text-gray-500 text-sm">Consultation Fee</h2>
                  <div className="flex items-center gap-3">
                    <p className="font-medium text-darkBlue">${doctorInfo.consultationFee}</p>
                    <button className="text-sm text-skyBlue hover:text-darkBlue transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-darkBlue">Availability</h2>
                  <button className="text-sm text-skyBlue hover:text-darkBlue transition-colors">
                    Edit Schedule
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-medium text-darkBlue">Monday - Friday</h3>
                    <p className="text-gray-600">9:00 AM - 5:00 PM</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-medium text-darkBlue">Saturday</h3>
                    <p className="text-gray-600">10:00 AM - 2:00 PM</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-medium text-darkBlue">Sunday</h3>
                    <p className="text-gray-600">Closed</p>
                  </div>
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


import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { isAuthenticated, userData ,userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(!isAuthenticated){
      navigate('/login');
    }
    if(userRole !== 'patient'){
      toast.error('You are not a Patient');
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // if (!isAuthenticated) {
  //   return null;
  // }
  // if(userRole !== 'patient'){
  //   toast.error('You are not a Patient');
  //   navigate('/login');
  // }
  if (!userData) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar /> 
      <div className='w-full flex justify-center items-center px-4'>
        <div className='shadow-2xl w-full max-w-[50rem] mt-10 p-4 md:p-10 font-Outfit rounded-xl'>
          <div className='flex flex-col md:flex-row gap-8'>
            <div className='w-32 h-32 md:w-48 md:h-48 mx-auto md:mx-0 rounded-full overflow-hidden flex-shrink-0'>
              <img 
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="Profile"
                className='w-full h-full object-cover'
              />
            </div>

            <div className='flex-1'>
              <h2 className='text-xl md:text-2xl font-semibold mb-6 text-center md:text-left'>Profile Information</h2>
              
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <p className='text-gray-500 text-sm'>Full Name</p>
                  <p className='text-base md:text-lg'>{userData.fullName}</p>
                </div>

                <div>
                  <p className='text-gray-500 text-sm'>Email Address</p>
                  <p className='text-base md:text-lg break-words'>{userData.email}</p>
                </div>

                <div>
                  <p className='text-gray-500 text-sm'>Address</p>
                  <p className='text-base md:text-lg'>{userData.address}</p>
                </div>

                <div>
                  <p className='text-gray-500 text-sm'>Age</p>
                  <p className='text-base md:text-lg'>{userData.age}</p>
                </div>

                <div>
                  <p className='text-gray-500 text-sm'>Blood Group</p>
                  <p className='text-base md:text-lg'>{userData.bloodType}</p>
                </div>

                <div>
                  <p className='text-gray-500 text-sm'>Gender</p>
                  <p className='text-base md:text-lg'>{userData.gender}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
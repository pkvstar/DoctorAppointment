import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';

const MyProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/profile',{withCredentials: true});
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
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
                  <p className='text-base md:text-lg'>{user.fullName}</p>
                </div>

                <div>
                  <p className='text-gray-500 text-sm'>Email Address</p>
                  <p className='text-base md:text-lg break-words'>{user.email}</p>
                </div>

                <div>
                  <p className='text-gray-500 text-sm'>Address</p>
                  <p className='text-base md:text-lg'>{user.address}</p>
                </div>

                <div>
                  <p className='text-gray-500 text-sm'>Age</p>
                  <p className='text-base md:text-lg'>{user.age}</p>
                </div>

                <div>
                  <p className='text-gray-500 text-sm'>Blood Group</p>
                  <p className='text-base md:text-lg'>{user.bloodType}</p>
                </div>

                <div>
                  <p className='text-gray-500 text-sm'>Gender</p>
                  <p className='text-base md:text-lg'>{user.gender}</p>
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
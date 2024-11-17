import React ,{ useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const MyAppointments = () => {
  const { isAuthenticated, userData ,userRole , loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(loading) return;
    if(!isAuthenticated){
      navigate('/login');
    }
    if(userRole !== 'patient'){
      toast.error('You are not a Patient');
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
    <>
    <Navbar />
    <div className='w-full px-4 py-8'>
      {(() => {
        const appointments = [
          {
            id: 1,
            doctor: {
              name: "Dr. John Smith",
              image: "https://example.com/doctor-image.jpg",
              degree: "MBBS",
              speciality: "Cardiologist", 
              experience: "15 years",
              fees: 500
            },
            date: "15th May 2024",
            time: "10:30 AM",
            status: "pending"
          },
          {
            id: 2,
            doctor: {
              name: "Dr. Sarah Johnson",
              image: "https://example.com/doctor-image2.jpg", 
              degree: "MD",
              speciality: "Dermatologist",
              experience: "10 years",
              fees: 800
            },
            date: "18th May 2024",
            time: "2:00 PM",
            status: "paid"
          },
          {
            id: 3,
            doctor: {
              name: "Dr. Michael Chen",
              image: "https://example.com/doctor-image3.jpg",
              degree: "MBBS, DM",
              speciality: "Neurologist",
              experience: "12 years",
              fees: 1000
            },
            date: "20th May 2024",
            time: "11:15 AM",
            status: "pending"
          },
          {
            id: 4,
            doctor: {
              name: "Dr. Emily Rodriguez",
              image: "https://example.com/doctor-image4.jpg",
              degree: "MD, DNB",
              speciality: "Pediatrician",
              experience: "8 years",
              fees: 600
            },
            date: "22nd May 2024",
            time: "4:30 PM",
            status: "pending"
          }
        ];

        return (
          <div className='font-Outfit'>
            <h2 className='text-3xl font-semibold mb-8 text-center'>My Appointments</h2>
            <div className='flex flex-col gap-6 max-w-[1200px] mx-auto'>
              {appointments.map((appointment) => (
                <div 
                  key={appointment.id} 
                  className='bg-white hover:bg-gray-50 transition-all duration-300 rounded-2xl p-6 border-l-4 border-skyBlue hover:border-darkBlue'
                >
                  <div className='flex flex-col md:flex-row gap-6'>
                    <div className='w-40 h-40 flex-shrink-0 rounded-2xl overflow-hidden bg-skyBlue/10 p-2'>
                      <img 
                        src={appointment.doctor.image}
                        alt={appointment.doctor.name}
                        className='w-full h-full object-cover rounded-xl'
                      />
                    </div>
                    <div className='flex-1'>
                      <div className='flex flex-col md:flex-row justify-between gap-4'>
                        <div>
                          <h3 className='text-2xl font-medium text-darkBlue'>{appointment.doctor.name}</h3>
                          <div className='flex items-center gap-2 mt-1'>
                            <p className='text-gray-600'>{appointment.doctor.degree} - {appointment.doctor.speciality}</p>
                            <span className='px-3 py-1 bg-skyBlue/10 text-darkBlue rounded-full text-sm'>
                              {appointment.doctor.experience}
                            </span>
                          </div>
                          <div className='mt-4 flex flex-wrap gap-4'>
                            <div className='bg-gray-100 px-4 py-2 rounded-lg'>
                              <p className='text-sm text-gray-500'>Date</p>
                              <p className='font-medium'>{appointment.date}</p>
                            </div>
                            <div className='bg-gray-100 px-4 py-2 rounded-lg'>
                              <p className='text-sm text-gray-500'>Time</p>
                              <p className='font-medium'>{appointment.time}</p>
                            </div>
                            <div className='bg-gray-100 px-4 py-2 rounded-lg'>
                              <p className='text-sm text-gray-500'>Fee</p>
                              <p className='font-medium'>₹{appointment.doctor.fees}</p>
                            </div>
                          </div>
                        </div>
                        <div className='flex flex-col gap-3 min-w-[140px]'>
                          {appointment.status === 'pending' ? (
                            <button className='px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors'>
                              Pay Now
                            </button>
                          ) : (
                            <div className='px-6 py-3 bg-green-100 text-green-700 rounded-xl text-center font-medium'>
                              Paid ✓
                            </div>
                          )}
                          <button className='px-6 py-3 border-2 border-red-500 text-red-500 hover:bg-red-50 rounded-xl transition-colors'>
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
    </>
  )
}

export default MyAppointments
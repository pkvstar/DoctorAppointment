import React, { useState, useContext, useEffect } from 'react'
import VerifyIcon from '../assets/Appointment/verify.png'
import About from '../assets/Appointment/info.png'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { AuthContext } from '../context/AuthContext'
import Navbar from '../Components/Navbar'
import { toast } from 'react-toastify'
import Footer from '../Components/Footer'

const Appointment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState("no");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const getDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  }

  useEffect(() => {
    getDocInfo()
  }, [doctors, docInfo])

  const handleBookAppointment = () => {
    if (!isAuthenticated) {
      toast.error('Please login to book an appointment');
      navigate('/login');
      return;
    }
    toast.success("Appointment Booked Successfully");
  }

  return docInfo && (
    <div>
      <Navbar />
      <div className='max-md:flex-col flex min-h-[20rem] w-full gap-3'>
        <div className='max-md:w-full w-3/10 flex flex-shrink-0 justify-center bg-skyBlue items-center border-2 border-gray-300 rounded-xl'>
          <img src={docInfo.image} className=' h-[20rem] '/>
        </div>
        <div className='md:w-full w-7/10 p-10 font-Outfit flex flex-col gap-3 border-2 rounded-xl border-gray-300'>
          <p className='text-3xl flex gap-2 items-center font-medium'>{docInfo.name}<img src={VerifyIcon} className=''/></p>
          <p className=' flex items-center gap-4 text-gray-600'>{docInfo.degree} - {docInfo.speciality} <p className='text-sm px-2 border-2 border-gray-300 rounded-full'>{docInfo.experience}</p></p>
          <p className=' font-medium flex items-center gap-1 mt-3'>About <img src={About} /></p>
          <p className=' text-sm'>{docInfo.about}</p>
          <p className=' text-lg font-medium'>Appointment Fees : ₹{docInfo.fees}</p>
        </div>
      </div>
      <div className='w-full p-10 font-Outfit flex flex-col gap-6 border-2 rounded-xl border-gray-300 mt-3'>
        <h2 className='text-2xl font-medium'>Book Appointment</h2>
        
        <div className='flex flex-col gap-4'>
          <div>
            <p className='mb-2 text-gray-600'>Select Date</p>
            <div className='flex flex-wrap gap-3'>
              {[...Array(7)].map((_, index) => {
                const date = new Date();
                date.setDate(date.getDate() + index);
                return (
                  <button 
                    key={index}
                    className={`w-24 px-4 py-2 border-2 rounded-lg transition-colors ${
                      selectedDate === index 
                        ? 'bg-skyBlue text-white border-darkBlue' 
                        : 'border-gray-300 hover:border-darkBlue'
                    }`}
                    onClick={() => setSelectedDate(index)}
                  >
                    <p className='text-sm'>{date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                    <p className='font-medium'>{date.getDate()}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className='mb-2 text-gray-600'>Available Time Slots</p>
            <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3'>
              {['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'].map((time, index) => (
                <button 
                  key={index}
                  className={`px-4 py-2 border-2 rounded-lg transition-colors ${
                    selectedTime === index
                      ? 'bg-skyBlue text-white border-darkBlue'
                      : 'border-gray-300 hover:border-darkBlue'
                  }`}
                  onClick={() => setSelectedTime(index)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button 
        className='bg-skyBlue text-white font-semibold py-3 px-5 rounded-lg hover:bg-darkBlue transition mt-4 mb-6'
        onClick={handleBookAppointment}
      >
        Book Appointment
      </button>
      <Footer />
    </div>
  )
}

export default Appointment
import React, { useState, useContext, useEffect } from 'react';
import VerifyIcon from '../assets/Appointment/verify.png';
import About from '../assets/Appointment/info.png';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../Components/Navbar';
import { toast } from 'react-toastify';
import Footer from '../Components/Footer';
import axios from 'axios';
import doctorProfile from '../assets/doctor.jpg'


const Appointment = () => {
  const { docId } = useParams();
  const { isAuthenticated,userRole, userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);

  const getDocInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/doctor/${docId}`);
      setDocInfo(response.data);
    } catch (error) {
      console.error('Error fetching doctor info:', error);
      toast.error('Failed to load doctor information');
    }
  };

  useEffect(() => {
    getDocInfo();
  }, [docId]);

  const handleDateSelect = (index) => {
    setSelectedDate(index);
    const date = new Date();
    date.setDate(date.getDate() + index);

    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const availability = docInfo.availability.find(
      (day) => day.day === dayName
    );
    setTimeSlots(availability?.slots || []);
    setSelectedTime(null); 
  };

  const handleBookAppointment = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to book an appointment');
      navigate('/login');
      return;
    }
    if (userRole !== 'patient') {
      toast.error('You are not a Patient');
      navigate('/');
      return;
    }

    if (selectedDate===null || !selectedTime) {
      toast.error('Please select a date and time for your appointment');
      return;
    }

    const date = new Date();
    date.setDate(date.getDate() + selectedDate);

    const bookingData = {
      doctorId: docId, 
      patientId: userData._id, 
      date: date.toISOString().split('T')[0], 
      time: selectedTime, 
      status: 'pending' 
    };

    try {
      let res = await axios.post(`http://localhost:5000/api/appointments`, bookingData);
      if(res.data.message === 'Appointment created successfully' ){
        toast.success('Appointment Booked Successfully');
        navigate('/myProfile');
      }
      else{
        toast.warning('Already Booked by other Patient');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Failed to book the appointment. Please try again.');
    }
  };

  return docInfo && (
    <div>
      <Navbar />
      <div className="max-md:flex-col flex min-h-[20rem] w-full gap-3">
        <div className="max-md:w-full w-3/10 flex flex-shrink-0 justify-center bg-skyBlue items-center border-2 border-gray-300 rounded-xl">
          <img src={doctorProfile || '/default-doctor.png'} className="h-[20rem] overflow-hidden" alt={docInfo.name} />
        </div>
        <div className="md:w-full w-7/10 p-10 font-Outfit flex flex-col gap-3 border-2 rounded-xl border-gray-300">
          <p className="text-3xl flex gap-2 items-center font-medium">
            {docInfo.name}
            <img src={VerifyIcon} alt="Verified" />
          </p>
          <p className="flex items-center gap-4 text-gray-600">
            {docInfo.education} - {docInfo.speciality}
            <span className="text-sm px-2 border-2 border-gray-300 rounded-full">
              {docInfo.experience} years
            </span>
          </p>
          <p className="font-medium flex items-center gap-1 mt-3">
            About <img src={About} alt="About" />
          </p>
          <p className="text-sm">{docInfo.about}</p>
          <p className="text-lg font-medium">
            Consultation Fee: ₹{docInfo.consultationFee}
          </p>
        </div>
      </div>
      <div className="w-full p-10 font-Outfit flex flex-col gap-6 border-2 rounded-xl border-gray-300 mt-3">
        <h2 className="text-2xl font-medium">Book Appointment</h2>
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-2 text-gray-600">Select Date</p>
            <div className="flex flex-wrap gap-3">
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
                    onClick={() => handleDateSelect(index)}
                  >
                    <p className="text-sm">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </p>
                    <p className="font-medium">{date.getDate()}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-2 text-gray-600">Available Time Slots</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {timeSlots.length > 0 ? (
                timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    className={`px-2 py-2 border-2 rounded-lg transition-colors ${
                      selectedTime === slot
                        ? 'bg-skyBlue text-white border-darkBlue'
                        : 'border-gray-300 hover:border-darkBlue'
                    }`}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </button>
                ))
              ) : (
                <p className="text-gray-600">No slots available for this day</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        className="bg-skyBlue text-white font-semibold py-3 px-5 rounded-lg hover:bg-darkBlue transition mt-4 mb-6"
        onClick={handleBookAppointment}
      >
        Book Appointment
      </button>
      <Footer />
    </div>
  );
};

export default Appointment;









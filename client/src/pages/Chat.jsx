import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import DoctorNavbar from '../components/DoctorNavbar';

const Chat = () => {
  const { appointmentId } = useParams();
  const { isAuthenticated, userRole, loading } = useAuth();
  const [appointmentData, setAppointmentData] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      navigate('/login');
    }
    if (userRole !== 'patient' && userRole !== 'doctor') {
      toast.error('You are not authorized');
      navigate('/');
    } else {
      fetchAppointmentData();
      const interval = setInterval(fetchAppointmentData, 5000); 
      return () => clearInterval(interval); 
    }
  }, [isAuthenticated, userRole, loading, navigate]);

  const fetchAppointmentData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/appointments/${appointmentId}/chat`);
      setAppointmentData(response.data.messages);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to load chat');
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) {
      toast.error('Cannot send empty message');
      return;
    }
    try {
      await axios.post(`http://localhost:5000/api/appointments/${appointmentId}/chat`, {
        sender: userRole,
        message,
      });
      setMessage(''); 
      fetchAppointmentData();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      {userRole === 'patient' ? <Navbar /> : <DoctorNavbar />}
      <div className='h-[80vh] border-2 border-gray-400 mt-3 rounded-md bg-slate-100 font-Outfit flex flex-col p-5'>
        <div className='h-[90%] overflow-x-auto'>
          {appointmentData.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col gap-1 w-[50vw] p-3 ${
                msg.sender === 'doctor' ? 'float-left bg-skyBlue' : 'float-right bg-blue-700'
              } text-white rounded-lg mb-2 mt-2`}
            >
              <p className='font-semibold text-black'>{msg.sender}:</p>
              <p>{msg.message}</p>
            </div>
          ))}
        </div>
        <div className='flex items-center gap-4 '>
          <input
            className='flex-1 shadow-lg rounded-full p-3 outline-none px-5'
            placeholder='Type a message...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div
            className='h-12 w-20 bg-skyBlue shadow-lg flex justify-center items-center rounded-3xl cursor-pointer'
            onClick={sendMessage}
          >
            <svg fill="#fff" height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 495.003 495.003" xmlSpace="preserve" stroke="#fff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_51_"> <path id="XMLID_53_" d="M164.711,456.687c0,2.966,1.647,5.686,4.266,7.072c2.617,1.385,5.799,1.207,8.245-0.468l55.09-37.616 l-67.6-32.22V456.687z"></path> <path id="XMLID_52_" d="M492.431,32.443c-1.513-1.395-3.466-2.125-5.44-2.125c-1.19,0-2.377,0.264-3.5,0.816L7.905,264.422 c-4.861,2.389-7.937,7.353-7.904,12.783c0.033,5.423,3.161,10.353,8.057,12.689l125.342,59.724l250.62-205.99L164.455,364.414 l156.145,74.4c1.918,0.919,4.012,1.376,6.084,1.376c1.768,0,3.519-0.322,5.186-0.977c3.637-1.438,6.527-4.318,7.97-7.956 L494.436,41.257C495.66,38.188,494.862,34.679,492.431,32.443z"></path> </g> </g></svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;



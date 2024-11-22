import React,{ useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import doctorProfile from '../assets/doctor.jpg'
import axios from 'axios'
const TopDoctors = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const fetchDoctors = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/doctors');
          setDoctors(response.data); // Assuming the API returns an array of doctors
        } catch (error) {
          console.error('Error fetching doctors:', error);
        }
      };
      useEffect(() => {
        fetchDoctors();
      }, []); 
  return (
    <div className=' flex flex-col items-center gap-4 my-12 md:mx-10'>
        <h1 className=' text-3xl font-Poppins font-semibold'>Popular Doctors</h1>
        <div className=' w-full grid grid-cols-auto gap-4 pt-3 gap-y-2 px-3 sm:px-0'>
            {
                doctors.slice(0,10).map((doctor,index) => (
                    <div className=' border border-blue-200 hover:shadow-2xl rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 m-2 bg-white' key={index}>
                        <img className=' bg-brightYellow ' src={doctorProfile} alt={doctor.name} />
                        <div className=' p-4'>
                            <div className=' flex items-center gap-2 text-sm text-center text-green-500'>
                                <span className='w-2 h-2 bg-green-500 rounded-full box'></span><p>Available</p>
                            </div>
                            <p className=' text-slate-800 font-semibold'>{doctor.name}</p>
                            <p>{doctor.speciality}</p>
                            <button onClick={()=>navigate(`/appointment/${doctor._id}`)} className='w-full py-1 px-2 mt-2 border-2 border-blue-500 rounded-lg text-blue-500 font-semibold whitespace-nowrap'>Book Appointment</button>
                        </div>
                    </div>
                )) 
            }
        </div>
        <button className=' py-3 px-8 bg-blue-500 font-semibold rounded-full text-white' onClick={()=>{navigate('/doctors');scrollTo(0,0)}}>More</button>
    </div>
  )
}

export default TopDoctors


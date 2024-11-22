import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../Components/Footer';
import doctorProfile from '../assets/doctor.jpg'
const Doctors = () => {
  const { speciality } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [specialDoc, setSpecialDoc] = useState([]);
  const navigate = useNavigate();

  // Fetch doctors from the backend
  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/doctors');
      setDoctors(response.data); // Assuming the API returns an array of doctors
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  // Filter doctors based on speciality
  const filterDoctors = () => {
    if (speciality) {
      setSpecialDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setSpecialDoc(doctors);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []); // Run once when the component mounts

  useEffect(() => {
    filterDoctors();
  }, [doctors, speciality]); // Re-run when doctors or speciality changes

  return (
    <>
      <Navbar />
      <div>
        <p className="text-xl text-black">Filter doctors according to speciality.</p>
        <div className="flex flex-col sm:flex-row items-start gap-4 mt-4">
          <div className="flex flex-col gap-4 text-sm text-gray-600">
            {[
              'General physician',
              'Gynecologist',
              'Dermatologist',
              'Pediatricians',
              'Neurologist',
              'Gastroenterologist',
              'Dentist',
            ].map((spec) => (
              <p
                key={spec}
                onClick={() => navigate(`/doctors/${spec}`)}
                className={`${
                  speciality === spec
                    ? 'bg-darkBlue text-white'
                    : 'bg-white text-black'
                } font-semibold w-[94vw] sm:w-auto pl-3 pr-12 py-2 border border-gray-300 rounded-md transition-all duration-500 cursor-pointer`}
              >
                {spec}
              </p>
            ))}
          </div>
          <div className="w-full grid grid-cols-auto gap-4 pt-3 gap-y-2 px-3 sm:px-0">
            {specialDoc.length <= 0 ? (
              <h1 className="text-center text-red-500">No Doctor Available.</h1>
            ) : (
              specialDoc.map((doctor) => (
                <div
                  className="border border-blue-200 hover:shadow-2xl rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 m-2 bg-white"
                  key={doctor._id}
                >
                  <img
                    className="w-full h-44 object-cover bg-brightYellow"
                    src={doctorProfile || 'default-profile.jpg'} // Default image if doctor has no profileImage
                    alt={doctor.name}
                    style={{ objectPosition: 'top' }}
                  />
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-center text-green-500">
                      <span className="w-2 h-2 bg-green-500 rounded-full box"></span>
                      <p>Available</p>
                    </div>
                    <p className="text-slate-800 font-semibold">{doctor.name}</p>
                    <p>{doctor.speciality}</p>
                    <button
                      onClick={() => navigate(`/appointment/${doctor._id}`)}
                      className="w-full py-1 px-2 mt-2 border-2 border-blue-500 rounded-lg text-blue-500 font-semibold"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Doctors;








// import React, { useContext,useState,useEffect } from 'react'
// import Navbar from '../Components/Navbar'
// import { useNavigate, useParams } from 'react-router-dom'
// import { AppContext } from '../context/AppContext';
// import Footer from '../Components/Footer'
// import axios from 'axios';
// import doctorProfile from '../assets/doctor.jpg'

// const Doctors = () => {
//   const { speciality } = useParams();
//   const { doctors } = useContext(AppContext);
//   const [specialDoc,setSpecialDoc] = useState([]);
//   const navigate = useNavigate();

//   //new
//   const fetchDoctors = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/doctors');
//       setSpecialDoc(response.data); // Assuming the API returns an array of doctors
//     } catch (error) {
//       console.error('Error fetching doctors:', error);
//     }
//   };
//   //end

//   const Filter=()=>{
//     if(speciality){
//       setSpecialDoc(doctors.filter(doc=>doc.speciality===speciality))
//     }
//     else{
//       setSpecialDoc(doctors)
//     }
//   }
//   //new
//   useEffect(() => {
//     fetchDoctors();
//   }, []); // Run once when the component mounts
//   //end
//   useEffect(()=>{
//     Filter()
//   },[doctors,speciality])
//   return (
//     <>
//     <Navbar />
//     <div>
//       <p className=' text-xl text-black'>Filter doctors according to speciality.</p>
//       <div className=' flex flex-col sm:flex-row items-start gap-4 mt-4'>
//         <div className=' flex flex-col gap-4 text-sm text-gray-600'>
//           <p onClick={()=> navigate('/doctors/General physician')} className={`${speciality==="General physician" ? "bg-darkBlue text-white" : "bg-white text-black"} font-semibold w-[94vw] sm:w-auto pl-3 pr-12 py-2 border border-gray-300 rounded-md transition-all duration-500 cursor-pointer `}>General physician</p>
//           <p onClick={()=> navigate('/doctors/Gynecologist')}      className={`${speciality==="Gynecologist" ? "bg-darkBlue text-white" : "bg-white text-black"} font-semibold w-[94vw] sm:w-auto pl-3 pr-12 py-2 border border-gray-300 rounded-md transition-all duration-500 cursor-pointer `}>Gynecologist</p>
//           <p onClick={()=> navigate('/doctors/Dermatologist')}     className={`${speciality==="Dermatologist" ? "bg-darkBlue text-white" : "bg-white text-black"} font-semibold w-[94vw] sm:w-auto pl-3 pr-12 py-2 border border-gray-300 rounded-md transition-all duration-500 cursor-pointer `}>Dermatologist</p>
//           <p onClick={()=> navigate('/doctors/Pediatricians')}     className={`${speciality==="Pediatricians" ? "bg-darkBlue text-white" : "bg-white text-black"} font-semibold w-[94vw] sm:w-auto pl-3 pr-12 py-2 border border-gray-300 rounded-md transition-all duration-500 cursor-pointer `}>Pediatricians</p>
//           <p onClick={()=> navigate('/doctors/Neurologist')}       className={`${speciality==="Neurologist" ? "bg-darkBlue text-white" : "bg-white text-black"} font-semibold w-[94vw] sm:w-auto pl-3 pr-12 py-2 border border-gray-300 rounded-md transition-all duration-500 cursor-pointer `}>Neurologist</p>
//           <p onClick={()=> navigate('/doctors/Gastroenterologist')}className={`${speciality==="Gastroenterologist" ? "bg-darkBlue text-white" : "bg-white text-black"} font-semibold w-[94vw] sm:w-auto pl-3 pr-12 py-2 border border-gray-300 rounded-md transition-all duration-500 cursor-pointer `}>Gastroenterologist</p>
//           <p onClick={()=> navigate('/doctors/Dentist')}className={`${speciality==="Dentist" ? "bg-darkBlue text-white" : "bg-white text-black"} font-semibold w-[94vw] sm:w-auto pl-3 pr-12 py-2 border border-gray-300 rounded-md transition-all duration-500 cursor-pointer `}>Dentist</p>
//         </div>
//         <div className=' w-full grid grid-cols-auto gap-4 pt-3 gap-y-2 px-3 sm:px-0'>
//           {
//             (specialDoc.length <=0 ) ? <h1 className=' text-center text-red-500'>No Doctor Available.</h1> :
//             specialDoc.map((doctor,index) => (
//               <div className=' border border-blue-200 hover:shadow-2xl rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 m-2 bg-white' key={index}>
//                   <img className=' bg-brightYellow' src={doctorProfile} alt={doctor.name} />
//                   <div className=' p-4'>
//                       <div className=' flex items-center gap-2 text-sm text-center text-green-500'>
//                           <span className='w-2 h-2 bg-green-500 rounded-full box'></span><p>Available</p>
//                       </div>
//                       <p className=' text-slate-800 font-semibold'>{doctor.name}</p>
//                       <p>{doctor.speciality}</p>
//                       <button onClick={()=>navigate(`/appointment/${doctor._id}`)} className='w-full py-1 px-2 mt-2 border-2 border-blue-500 rounded-lg text-blue-500 font-semibold'>Book Appointment</button>
//                   </div>
//               </div>
//           ))
//           }
//         </div>
//       </div>
//       <Footer/>
//     </div>
//     </>
//   )
// }

// export default Doctors
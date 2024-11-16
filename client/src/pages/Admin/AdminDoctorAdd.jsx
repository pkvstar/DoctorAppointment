import React, { useState , useEffect } from 'react';
import AdminNavbar from '../../Components/AdminNavbar';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDoctorAdd = () => {
  const { isAuthenticated, userData ,userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(!isAuthenticated){
      navigate('/login');
    }
    if(userRole !== 'admin'){
      toast.error('You are not an admin');
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  const [availability, setAvailability] = useState([
    { day: 'Monday', slots: [] },
    { day: 'Tuesday', slots: [] },
    { day: 'Wednesday', slots: [] },
    { day: 'Thursday', slots: [] },
    { day: 'Friday', slots: [] },
    { day: 'Saturday', slots: [] },
    { day: 'Sunday', slots: [] }
  ]);

  const handleSlotChange = (dayIndex, slotIndex, value) => {
    const newAvailability = [...availability];
    newAvailability[dayIndex].slots[slotIndex] = value;
    setAvailability(newAvailability);
  };

  const addSlot = (dayIndex) => {
    const newAvailability = [...availability];
    newAvailability[dayIndex].slots.push('');
    setAvailability(newAvailability);
  };

  return (
    <div>
      <AdminNavbar />
      <div className="p-4 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-darkBlue">Add New Doctor</h2>
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center">
          <div className="w-full md:w-72 flex flex-col items-center justify-center">
            <div className="mb-6 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 md:w-48 md:h-48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="8" r="4" strokeWidth="1.5"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6"/>
              </svg>
            </div>
            <input type="file" className="hidden" id="doctorImage" accept="image/*"/>
            <label htmlFor="doctorImage" className="bg-darkBlue text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition text-sm md:text-base">
              Upload Photo
            </label>
          </div>

          <div className="w-full max-w-[600px] bg-white rounded-xl shadow-lg p-4 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-gray-700 mb-2 text-sm md:text-base">Doctor Name</label>
                <input type="text" className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:border-darkBlue text-sm md:text-base"/>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm md:text-base">Speciality</label>
                <select className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:border-darkBlue text-sm md:text-base">
                  <option>General physician</option>
                  <option>Gynecologist</option>
                  <option>Dermatologist</option>
                  <option>Pediatricians</option>
                  <option>Neurologist</option>
                  <option>Gastroenterologist</option>
                  <option>Dentist</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm md:text-base">Email</label>
                <input type="email" className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:border-darkBlue text-sm md:text-base"/>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm md:text-base">Password</label>
                <input type="password" className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:border-darkBlue text-sm md:text-base"/>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm md:text-base">Education</label>
                <input type="text" className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:border-darkBlue text-sm md:text-base"/>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm md:text-base">Experience (years)</label>
                <input type="number" className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:border-darkBlue text-sm md:text-base"/>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm md:text-base">Consultation Fee</label>
                <input type="number" className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:border-darkBlue text-sm md:text-base"/>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm md:text-base">Address</label>
                <input type="text" className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:border-darkBlue text-sm md:text-base"/>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-gray-700 mb-2 text-sm md:text-base">About Doctor</label>
                <textarea className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:border-darkBlue h-24 md:h-32 resize-none text-sm md:text-base"></textarea>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Availability</h3>
              {availability.map((day, dayIndex) => (
                <div key={dayIndex} className="mb-4">
                  <h4 className="font-medium">{day.day}</h4>
                  {day.slots.map((slot, slotIndex) => (
                    <input
                      key={slotIndex}
                      type="text"
                      value={slot}
                      onChange={(e) => handleSlotChange(dayIndex, slotIndex, e.target.value)}
                      placeholder="Enter time slot (e.g., 9:00 AM - 11:00 AM)"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-darkBlue text-sm md:text-base mb-2"
                    />
                  ))}
                  <button
                    onClick={() => addSlot(dayIndex)}
                    className="text-sm text-skyBlue hover:text-darkBlue transition-colors"
                  >
                    Add Slot
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 md:mt-8 bg-darkBlue text-white py-2 md:py-3 rounded-lg hover:bg-blue-700 transition text-sm md:text-base">
              Add Doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDoctorAdd
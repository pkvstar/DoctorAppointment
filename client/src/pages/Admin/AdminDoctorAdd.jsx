import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../Components/AdminNavbar';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDoctorAdd = () => {
  const { isAuthenticated, userData, userRole, loading } = useAuth();
  const navigate = useNavigate();

  const [doctorData, setDoctorData] = useState({
    name: '',
    speciality: 'General physician',
    email: '',
    password: '',
    education: '',
    experience: '',
    consultationFee: '',
    address: '',
    about: '',
    gender:''
  });

  const [availability, setAvailability] = useState([
    { day: 'Monday', slots: [] },
    { day: 'Tuesday', slots: [] },
    { day: 'Wednesday', slots: [] },
    { day: 'Thursday', slots: [] },
    { day: 'Friday', slots: [] },
    { day: 'Saturday', slots: [] },
    { day: 'Sunday', slots: [] }
  ]);

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      navigate('/login');
    }
    if (userRole !== 'admin') {
      toast.error('You are not an admin');
      navigate('/');
    }
  }, [isAuthenticated, userRole, navigate, loading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!doctorData.name || !doctorData.email || !doctorData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/newDoctor/register', {
        ...doctorData,
        availability: JSON.stringify(availability)
      });

      toast.success('Doctor added successfully');
      // navigate('/admin-dashboard');
    } catch (error) {
      console.error('Error adding doctor:', error);
      toast.error('Failed to add doctor');
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
    <div>
      <AdminNavbar />
      <div className="p-4 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-darkBlue">Add New Doctor</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center">
          <div className="w-full max-w-[600px] bg-white rounded-xl shadow-lg p-4 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-gray-700 mb-2 text-sm md:text-base">Doctor Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={doctorData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:border-darkBlue text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm md:text-base">Gender</label>
                <select 
                  name="gender"
                  value={doctorData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:border-darkBlue text-sm md:text-base"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm md:text-base">Speciality</label>
                <select 
                  name="speciality"
                  value={doctorData.speciality}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:border-darkBlue text-sm md:text-base"
                >
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
                <input 
                  type="email" 
                  name="email"
                  value={doctorData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:border-darkBlue text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm md:text-base">Password</label>
                <input 
                  type="password" 
                  name="password"
                  value={doctorData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:border-darkBlue text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm md:text-base">Education</label>
                <input 
                  type="text" 
                  name="education"
                  value={doctorData.education}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:border-darkBlue text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm md:text-base">Experience (years)</label>
                <input 
                  type="number" 
                  name="experience"
                  value={doctorData.experience}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:border-darkBlue text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm md:text-base">Consultation Fee</label>
                <input 
                  type="number" 
                  name="consultationFee"
                  value={doctorData.consultationFee}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:border-darkBlue text-sm md:text-base"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-sm md:text-base">Address</label>
                <input 
                  type="text" 
                  name="address"
                  value={doctorData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:border-darkBlue text-sm md:text-base"
                />
              </div>
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-gray-700 mb-2 text-sm md:text-base">About Doctor</label>
                <textarea 
                  name="about"
                  value={doctorData.about}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:border-darkBlue h-24 md:h-32 resize-none text-sm md:text-base"
                ></textarea>
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
                    type="button"
                    onClick={() => addSlot(dayIndex)}
                    className="text-sm text-skyBlue hover:text-darkBlue transition-colors"
                  >
                    Add Slot
                  </button>
                </div>
              ))}
            </div>
            <button 
              type="submit" 
              className="w-full mt-6 md:mt-8 bg-darkBlue text-white py-2 md:py-3 rounded-lg hover:bg-blue-700 transition text-sm md:text-base"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminDoctorAdd;
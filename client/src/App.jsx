import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import Login from './pages/Login';
import Register from './pages/Register';
import Notexist from './pages/Notexist';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminAppointment from './pages/Admin/AdminAppointment';
import AdminAllDoctors from './pages/Admin/AdminAllDoctors';
import AdminDoctorReq from './pages/Admin/AdminDoctorAdd';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <div className='mx-4'>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor-appointments' element={<DoctorAppointment />} />
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path='/admin-appointments' element={<AdminAppointment />} />
          <Route path='/admin-doctorsList' element={<AdminAllDoctors />} />
          <Route path='/admin-doctorAdd' element={<AdminDoctorReq />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/myProfile' element={<MyProfile />} />
          <Route path='/myAppointments' element={<MyAppointments />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
          <Route path='*' element={<Notexist />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
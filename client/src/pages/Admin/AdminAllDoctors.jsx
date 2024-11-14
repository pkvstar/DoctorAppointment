import React, { useContext } from 'react'
import AdminNavbar from '../../Components/AdminNavbar'
import { AppContext } from '../../context/AppContext'

const AdminAllDoctors = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div>
      <AdminNavbar />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">All Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center space-x-4 mb-3">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.speciality}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded">
                  Show More
                </button>
                <button className="px-3 py-1 bg-red-100 text-red-800 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminAllDoctors
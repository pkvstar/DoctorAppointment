import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const checkAuthStatus = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/check-auth', { withCredentials: true });
      setIsAuthenticated(data.isAuthenticated);
      setUserRole(data.role);
      if (data.dataRole) {
        setUserData(data.dataRole);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUserData(null);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', userData, { withCredentials: true });
      setIsAuthenticated(true);
      setUserRole(response.data.role);
      
      const authCheck = await axios.get('http://localhost:5000/api/check-auth', { withCredentials: true });
      if (authCheck.data.dataRole) {
        setUserData(authCheck.data.dataRole);
      }
      
      return response.data;
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUserRole(null);
      setUserData(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/doctors');
      setDoctors(response.data); // Assuming the API returns an array of doctors
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };
  
  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };
  useEffect(() => {
    checkAuthStatus();
    fetchPatients();  
  }, []);  
  useEffect(()=>{
    fetchDoctors();
  },[])

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userRole, 
      userData, 
      setIsAuthenticated,
      login,
      logout,
      doctors,
      patients,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

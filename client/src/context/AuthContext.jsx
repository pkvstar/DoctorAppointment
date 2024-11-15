import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);

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

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userRole, 
      userData, 
      setIsAuthenticated,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

























// import React, { createContext, useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export const AuthContext = createContext();

// const AuthContextProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   const checkAuth = useCallback(async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/protected', { withCredentials: true });
//       if (response.data.user) {
//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(false);
//       }
//     } catch (error) {
//       setIsAuthenticated(false);
//     }
//   }, []);

//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   const login = async (userData) => {
//     try {
//       await axios.post('http://localhost:5000/api/auth/login', userData, { withCredentials: true });
//       setIsAuthenticated(true);
//       navigate('/myProfile');
//     } catch (error) {
//       console.error('Login failed:', error);
//     }
//   };

//   const logout = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
//       setIsAuthenticated(false);
//       navigate('/login');
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   const updateAuthStatus = (status) => {
//     setIsAuthenticated(status);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout, updateAuthStatus, checkAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContextProvider;


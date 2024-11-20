import { createContext, useContext, useState, useEffect } from 'react';
import axios from "../axiosConfig";

const AuthContext = createContext({
  user: null,
  logIn: () => {},
  logOut: () => {},
  checkAuthStatus: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to handle login
  const logIn = (userData) => {
    console.log('Logging in: setting user.');
    setUser(userData);  // Set the user state with the fetched user data
  };

  // Function to handle logout
  const logOut = () => {
    console.log('Attempting to log out...');
    axios.post('/logout/').then(() => {
      console.log('Logged out: setting user to null and redirecting to login page.');
      setUser(null);
      window.location.href = '/login';
    }).catch(error => {
      console.error('Error during logout:', error);
    });
  };

  // Function to manually check authentication status
  const checkAuthStatus = async () => {
    console.log('Manually checking authentication status...');
    try {
      const response = await axios.get('/get_profile_data/');
      console.log('Profile data retrieved:', response.data);
      setUser(response.data);
      return true;
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setUser(null);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, logIn, logOut, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

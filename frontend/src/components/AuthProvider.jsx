import { createContext, useContext, useState, useEffect } from 'react';
import axios from "../axiosConfig";

// Create the AuthContext with default values
const AuthContext = createContext({
  isAuthenticated: false,
  logIn: () => {},
  logOut: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle login
  const logIn = () => {
    console.log('Logging in: setting isAuthenticated to true.');
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const logOut = () => {
    console.log('Logging out: setting isAuthenticated to false.');
    setIsAuthenticated(false);
    // Perform any other logout operations, e.g., redirecting the user
    axios.post('/logout/').then(() => {
      console.log('Logged out: redirecting to login page.');
      // Redirect user to login page or home page after logging out
      window.location.href = '/login';
    }).catch(error => {
      console.error('Error during logout:', error);
    });
  };

  // Effect to check authentication status
  const checkAuthStatus = () => {
    console.log('Manually checking authentication status...');
    axios.get('/check_auth_status/')
      .then(response => {
        console.log('Authentication status:', response.data.isAuthenticated);
        setIsAuthenticated(response.data.isAuthenticated);
      })
      .catch(error => {
        console.error('Error checking authentication status:', error);
        setIsAuthenticated(false);
      });
  };

  // Provide the context
  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuthStatus, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, useContext, useState, useEffect } from 'react';
import axios from "../axiosConfig";

// Create the AuthContext with default values
const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  logIn: () => {},
  logOut: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Initializes user state as null
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle login
  const logIn = (userData) => {
    console.log('Logging in: setting isAuthenticated to true.');
    setIsAuthenticated(true);
    setUser(userData);  // Set the user state with the fetched user data
  };

  // Function to handle logout
  const logOut = () => {
    console.log('Attempting to log out...');
    axios.post('/logout/').then(() => {
      console.log('Logged out: setting isAuthenticated to false and redirecting to login page.');
      setIsAuthenticated(false);
      setUser(null);
      window.location.href = '/login';
    }).catch(error => {
      console.error('Error during logout:', error);
    });
  };

  // Effect to check authentication status on mount
  useEffect(() => {
    console.log('Manually checking authentication status...');
    axios.get('/get_profile_data/')
      .then(response => {
        console.log('Profile data retrieved:', response.data);
        setIsAuthenticated(true);
        setUser(response.data);  // Set user data upon successful fetch
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
        setIsAuthenticated(false);
        setUser(null);
      });
  }, []);

  // Provide the context
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

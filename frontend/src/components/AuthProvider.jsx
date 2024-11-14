import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if isAuthenticated is stored in localStorage
    const isAuth = localStorage.getItem('isAuthenticated');
    return isAuth === 'true';  // Convert to boolean
  });

  const logIn = useCallback((status) => {
    setIsAuthenticated(status);
    localStorage.setItem('isAuthenticated', status);  // Store the status in localStorage
  }, []);

  const logOut = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');  // Clear the stored status
    // Add any other cleanup or logout logic here, like clearing tokens
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      axios.get('/check_auth_status/')
        .then(response => {
          if (response.data.isAuthenticated) {
            logIn(true);
          }
        })
        .catch(() => setIsAuthenticated(false));
    }
  }, [isAuthenticated, logIn]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

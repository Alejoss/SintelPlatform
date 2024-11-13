import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logIn = useCallback((status) => {
    setIsAuthenticated(status);
  }, []);

  const logOut = useCallback(() => {
    setIsAuthenticated(false);
    // Add any other cleanup or logout logic here, like clearing tokens
  }, []);

  useEffect(() => {
    axios.get('/is_authenticated/')
      .then(response => setIsAuthenticated(response.data.isAuthenticated))
      .catch(() => setIsAuthenticated(false));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

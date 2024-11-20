import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from './AuthProvider';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  console.log("PrivateRoute check:", user ? 'Authenticated' : 'Not authenticated');
  console.log("Current Location:", location.pathname);

  // Redirect to login page if not authenticated, preserving the intended destination
  return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;

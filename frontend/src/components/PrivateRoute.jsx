import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from './AuthProvider';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  console.log("PrivateRoute check:", isAuthenticated);
  console.log("Current Location:", location.pathname);

  // Redirect to login page if not authenticated, preserving the intended destination
  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from './AuthProvider';  // Adjust the path as necessary

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth(); // Destructure to get isAuthenticated

  // Redirect to login page if not authenticated, preserving the intended destination
  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;

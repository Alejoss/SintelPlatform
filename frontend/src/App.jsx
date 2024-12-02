import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from './components/AuthProvider';  // Ensure path is correct
import Navbar from "./components/Navbar";
import Project from "./pages/Project.jsx";
import Balance from "./pages/Balance.jsx";
import Profile from "./pages/Profile.jsx";
import Signin from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="bg-gray-800 h-[100vh]">
      {user && <Navbar />}
      <div className="flex-1 mt-20 lg:mt-0 lg:ml-48 ">
        <Routes>
          <Route path="/login" element={<Signin />} />
          <Route path="/" element={<PrivateRoute><Balance /></PrivateRoute>} />
          <Route path="/balance" element={<PrivateRoute><Balance /></PrivateRoute>} />
          <Route path="/project" element={<PrivateRoute><Project /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

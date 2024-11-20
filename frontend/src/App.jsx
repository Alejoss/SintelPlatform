import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from './components/AuthProvider';  // Ensure path is correct
import Navbar from "./components/Navbar";
import Tab2 from "./pages/Tab2";
import Tab1 from "./pages/Tab1";
import Tab3 from "./pages/Tab3";
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
          <Route path="/" element={<PrivateRoute><Tab1 /></PrivateRoute>} />
          <Route path="/tab1" element={<PrivateRoute><Tab1 /></PrivateRoute>} />
          <Route path="/tab2" element={<PrivateRoute><Tab2 /></PrivateRoute>} />
          <Route path="/tab3" element={<PrivateRoute><Tab3 /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

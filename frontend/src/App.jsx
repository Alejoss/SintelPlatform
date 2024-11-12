import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Tab2 from "./pages/Tab2";
import Tab1 from "./pages/Tab1";
import Tab3 from "./pages/Tab3";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect, useState } from "react";


function App() {
  return (
    <Router>

      <AppContent />
      <div className=" bg-gray-800 h-[100vh]">
        <Navbar />
        <div className="flex-1 mt-20 lg:mt-0 lg:ml-48 ">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Tab1 />} />
            <Route path="/tab1" element={<Tab1 />} />
            <Route path="/tab2" element={<Tab2 />} />
            <Route path="/tab3" element={<Tab3 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    setShowNavbar(["/", "/tab1", "/tab2", "/tab3"].includes(location.pathname));
  }, [location]);

  return (
    <div className="bg-gray-800 h-[100vh]">
      {showNavbar && <Navbar />}
      <div className={`flex-1 ${showNavbar ? "mt-20 lg:mt-0 lg:ml-48" : ""}`}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Tab1 />
              </PrivateRoute>
            }
          />
          <Route
            path="/tab1"
            element={
              <PrivateRoute>
                <Tab1 />
              </PrivateRoute>
            }
          />
          <Route
            path="/tab2"
            element={
              <PrivateRoute>
                <Tab2 />
              </PrivateRoute>
            }
          />
          <Route
            path="/tab3"
            element={
              <PrivateRoute>
                <Tab3 />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

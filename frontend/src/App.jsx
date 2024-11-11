import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Tab2 from "./pages/Tab2";
import Tab1 from "./pages/Tab1";
import Tab3 from "./pages/Tab3";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
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

export default App;

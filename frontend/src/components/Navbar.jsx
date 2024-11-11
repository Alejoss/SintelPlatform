import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import close from "../assets/close-2.svg";
import menu from "../assets/menu.svg";
import API from '../api'; // Assuming you have an API setup that can handle logout

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      // Assuming you have a logout endpoint that handles token invalidation
      await API.post('/logout/');
      // Optionally clear the local storage or cookie where the JWT is stored
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="bg-gray-800 z-50 lg:shadow-xl lg:shadow-slate-600 overflow-hidden px-6 w-full absolute top-0 left-0 lg:w-48 lg:fixed lg:h-full">
      <div className={`${isOpen ? "h-[100vh]" : "h-20"} flex flex-col p-2 bg-gray-800 transition-all duration-700 lg:justify-start`}>
        <button onClick={toggleNavbar} className="text-white text-end w-fit ml-auto lg:hidden">
          <img src={isOpen ? close : menu} alt={isOpen ? "Close menu" : "Open menu"} className="w-10" />
        </button>
        <ul className={`${isOpen ? "block" : "hidden"} text-4xl space-y-14 pt-8 pl-4 md:flex md:flex-col md:pl-0 md:text-3xl md:space-y-12`}>
          <li className="w-fit hover:scale-125 hover:underline hover:underline-offset-8 transition-all duration-500">
            <Link to="/tab1" className="text-white cursor-pointer">Tab 1</Link>
          </li>
          <li className="w-fit hover:scale-125 hover:underline hover:underline-offset-8 transition-all duration-500">
            <Link to="/tab2" className="text-white cursor-pointer">Tab 2</Link>
          </li>
          <li className="w-fit hover:scale-125 hover:underline hover:underline-offset-8 transition-all duration-500">
            <Link to="/tab3" className="text-white cursor-pointer">Tab 3</Link>
          </li>
          <li className="w-fit hover:scale-125 hover:underline hover:underline-offset-8 transition-all duration-500">
            <Link to="/login" className="text-white cursor-pointer">Login</Link>
          </li>
          <li className="w-fit hover:scale-125 hover:underline hover:underline-offset-8 transition-all duration-500">
            <button onClick={handleLogout} className="text-white cursor-pointer">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

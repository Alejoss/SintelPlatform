import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import close from "../assets/close-2.svg";
import menu from "../assets/menu.svg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Set initial state based on window size
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className="bg-gray-800 z-50 lg:shadow-xl lg:shadow-slate-600 overflow-hidden px-6 w-full absolute top-0 left-0
    lg:w-48 lg:fixed lg:h-full"
    >
      <div
        className={`${
          isOpen ? "h-[100vh]" : "h-20"
        } flex flex-col p-2  bg-gray-800  transition-all duration-700  lg:justify-start`}
      >
        <button
          className="text-white text-end  lg:hidden"
          onClick={toggleNavbar}
        >
          <div className="w-full flex items-end justify-end p-2">
            <img
              src={isOpen ? close : menu}
              alt={isOpen ? "close menu" : "open menu"}
              className="w-10"
            />
          </div>
        </button>
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } text-4xl space-y-14 pt-8 pl-4 md:flex md:flex-col md:pl-0 md:text-3xl md:space-y-12`}
        >
          <li
            className="w-fit hover:scale-125 
             hover:underline 
                hover:underline-offset-8 transition-all duration-500"
          >
            <Link
              to="/tab1"
              className="
               text-white cursor-pointer
               "
            >
              Tab 1
            </Link>
          </li>
          <li
            className="w-fit hover:scale-125 
             hover:underline 
                hover:underline-offset-8 transition-all duration-500"
          >
            <Link
              to="/tab2"
              className="
               text-white cursor-pointer "
            >
              Tab 2
            </Link>
          </li>
          <li
            className="w-fit hover:scale-125 
             hover:underline 
                hover:underline-offset-8 transition-all duration-500"
          >
            <Link
              to="/tab3"
              className="
               text-white cursor-pointer "
            >
              Tab 3
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

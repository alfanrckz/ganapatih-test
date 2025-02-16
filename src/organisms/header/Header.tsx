import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaMapMarkedAlt, FaInfoCircle } from "react-icons/fa";

export const Header: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { to: "/home", label: "Dashboard", icon: <RxDashboard size={20} /> },
    { to: "/map", label: "Map Plot", icon: <FaMapMarkedAlt size={20} /> },
    { to: "/linnegraph", label: "About", icon: <FaInfoCircle size={20} /> },
  ];

  return (
    <nav className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-gray-900 text-white h-full overflow-hidden">
      <div className="flex justify-between items-center relative sm:px-0  h-32">
        <h1 className="text-3xl font-semibold text-amber-400 ">Taxi NYC</h1>
      <br />
        {/* Menu Mobile */}
       
      </div>
      <button className="sm:hidden text-gray-300 hover:text-white mt-5 " onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      {/* Menu Items */}
      <div className={`sm:flex flex-col sm:flex-row sm:items-center lg:flex-wrap mt-5 sm:mt-0 ${isOpen ? "block" : "hidden"}`}>
        {menuItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center px-4 py-2 rounded-lg transition-all sm:mx-2 ${
              location.pathname === item.to ? "text-white font-semibold" : "text-gray-300 hover:text-white"
            }`}
            onClick={() => setIsOpen(false)}
          >
            <span className="mr-2">{item.icon}</span> {item.label}
          
          </Link>
        ))}
      </div>
    </nav>
  );
};

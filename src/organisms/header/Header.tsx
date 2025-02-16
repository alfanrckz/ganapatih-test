import { Menu } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { FaMapMarkedAlt, FaInfoCircle } from "react-icons/fa";

export const Header: React.FC = () => {
  const location = useLocation(); // Mendapatkan path halaman yang sedang aktif

  const menuItems = [
    { to: "/home", label: "Dashboard", icon: <RxDashboard size={20} /> },
    { to: "/map", label: "Map Plot", icon: <FaMapMarkedAlt size={20} /> },
    { to: "/linnegraph", label: "About", icon: <FaInfoCircle size={20} /> },
  ];

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[100vh]">
      <h1 className="text-3xl font-semibold text-center text-amber-400 pt-2">
        Taxi NYC
      </h1>
      <div className="flex flex-col text-start pt-12 space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center px-3 py-2 rounded-lg transition-all ${
              location.pathname === item.to ? " text-white font-semibold" : "text-gray-300 hover:text-white"
            }`}
          >
            <span className="mr-2">{item.icon}</span> {item.label}
          </Link>
        ))}
      </div>

      {/* Tombol menu untuk tampilan mobile */}
      <div className="flex items-center sm:hidden mt-5">
        <button className="text-gray-500 hover:text-gray-700">
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

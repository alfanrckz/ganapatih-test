import { Menu } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  // const { isAuthenticated, logout } = useAuth();

  return (
    
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[100vh]">
       
            <h1 className='text-3xl font-semibold text-center text-amber-400 pt-2'>Taxi NYC</h1>
          <div className="flex flex-col text-start pt-12">
            <Link to="/home" className="text-gray-300 hover:text-white px-3 py-2">
              Dashboard
            </Link>
            <Link to="/map" className="text-gray-300 hover:text-white px-3 py-2">
              Map plot
            </Link>
            <Link to="/linnegraph" className="text-gray-300 hover:text-white px-3 py-2">
              Scatter and Linegraph
            </Link>
           
          </div>

          <div className="flex items-center sm:hidden">
            <button className="text-gray-500 hover:text-gray-700">
              <Menu size={24} />
            </button>
          </div>
     
      </nav>

  );
};
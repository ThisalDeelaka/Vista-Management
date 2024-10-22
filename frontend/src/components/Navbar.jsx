import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 bg-opacity-95 backdrop-blur-md p-5 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-white text-3xl font-bold tracking-widest">
          Vista English Institute
        </h1>
        
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-lg text-gray-200 hover:text-white transition duration-300 hover:underline">
            Home
          </Link>
          <Link to="/add-student" className="text-lg text-gray-200 hover:text-white transition duration-300 hover:underline">
            Add Student
          </Link>
          <Link to="/view-students" className="text-lg text-gray-200 hover:text-white transition duration-300 hover:underline">
            View Students
          </Link>
          <Link to="/payment-status" className="text-lg text-gray-200 hover:text-white transition duration-300 hover:underline">
            Payment Status
          </Link>
          {/* Search Bar */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="text-gray-700 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <FaSearch className="absolute right-2 top-3 text-gray-500" />
          </div>
        </div>

        {/* Mobile Burger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-300 focus:outline-none">
            {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-800 bg-opacity-95 py-4`}>
        <div className="flex flex-col items-center space-y-4">
          <Link to="/" className="text-lg text-gray-200 hover:text-white transition duration-300" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/add-student" className="text-lg text-gray-200 hover:text-white transition duration-300" onClick={toggleMenu}>
            Add Student
          </Link>
          <Link to="/view-students" className="text-lg text-gray-200 hover:text-white transition duration-300" onClick={toggleMenu}>
            View Students
          </Link>
          <Link to="/payment-status" className="text-lg text-gray-200 hover:text-white transition duration-300" onClick={toggleMenu}>
            Payment Status
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

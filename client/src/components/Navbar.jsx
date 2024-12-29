import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-blue-600 text-2xl font-bold">
          <Link to="/">ShopEasy</Link>
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-6 items-center ">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 font-medium transition duration-200"
          >
            Home
          </Link>
          
          
          <Link
            to="/shop"
            className="text-gray-600 hover:text-blue-600 font-medium transition duration-200"
          >
            Shop
          </Link>
          <Link
            to="/profile"
            className="text-gray-600 hover:text-blue-600 font-medium transition duration-200"
          >
            Profile
          </Link>
          <Link
            to="/contact"
            className="text-gray-600 hover:text-blue-600 font-medium transition duration-200"
          >
            Contact Us
          </Link>
          <Link
            to="/register"
            className="text-gray-600 hover:text-blue-600 font-medium transition duration-200"
          >
           Register
          </Link>
          
          <Link
            to="/login"
          >
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Login
            </button>
          </Link>
          <Link
            to="/add-product"
          >
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Add your Product
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden text-gray-600 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
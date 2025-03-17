import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* AFL Logo */}
          <div className="flex-shrink-0">
            <img src="/afl-logo.png" alt="AFL Logo" className="h-12" />
          </div>

          {/* Team Logos Scroll */}
          <div className="hidden md:flex flex-1 mx-8 overflow-x-auto scrollbar-hide">
            <div className="flex space-x-6">
              {/* Team logos will be mapped here */}
              {/* Placeholder for now */}
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4">
            <button className="bg-red-600 text-white px-4 py-2 rounded-md">
              Home
            </button>
            <div className="relative">
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900">
                Prediction ▼
              </button>
            </div>
            <div className="relative">
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900">
                Teams ▼
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block ml-4">
            <input
              type="search"
              placeholder="Search..."
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

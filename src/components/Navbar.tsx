import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* AFL Logo */}
          <div className="flex-shrink-0">
            <img src="/afl-logo.svg" alt="AFL Logo" className="h-12 w-auto hover:opacity-90 transition-opacity" />
          </div>

          {/* Team Logos Scroll */}
          <div className="hidden md:flex flex-1 mx-8 overflow-x-auto scrollbar-hide">
            <div className="flex space-x-6 py-2 px-4">
              {['Collingwood', 'Carlton', 'Brisbane', 'GWS', 'Melbourne', 'Sydney', 'Geelong', 'Richmond'].map((team) => (
                <div 
                  key={team}
                  className="w-12 h-12 bg-gray-100 rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer"
                >
                  <span className="text-xs font-semibold text-gray-600">{team.slice(0, 3)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4">
            <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors shadow-md hover:shadow-lg font-semibold">
              Home
            </button>
            <div className="relative group">
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium group-hover:text-red-600 transition-colors">
                Prediction ▼
              </button>
              <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg rounded-md mt-1 py-2">
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600">Live Prediction</a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600">Historical Data</a>
              </div>
            </div>
            <div className="relative group">
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium group-hover:text-red-600 transition-colors">
                Teams ▼
              </button>
              <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg rounded-md mt-1 py-2">
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600">Team Rankings</a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600">Team Stats</a>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block ml-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search teams, matches..."
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 w-64 transition-all focus:w-72"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

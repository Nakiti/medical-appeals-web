import React from 'react';

const Header = () => {
   return (
      <header className="bg-white shadow">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
               <a href="/" className="text-lg font-semibold text-gray-900">
               Logo
               </a>
               <nav className="hidden md:flex space-x-8 ml-10">
               <a href="#features" className="text-gray-500 hover:text-gray-900">
                  Features
               </a>
               <a href="#pricing" className="text-gray-500 hover:text-gray-900">
                  Pricing
               </a>
               <a href="#contact" className="text-gray-500 hover:text-gray-900">
                  Contact
               </a>
               </nav>
            </div>
            {/* <div className="hidden md:flex items-center space-x-4">
               <a href="/login" className="text-gray-500 hover:text-gray-900">
               Login
               </a>
               <a href="/signup" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
               Sign Up
               </a>
            </div> */}
            <div className="md:hidden">
               <button type="button" className="text-gray-500 hover:text-gray-900">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
               </svg>
               </button>
            </div>
         </div>
         </div>
      </header>
   );
};

export default Header;

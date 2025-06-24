import React, { useState, useEffect, useRef, useContext } from 'react';
import { FiMenu, FiUser } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/services/authServices';
import { SidebarContext } from '@/app/context/sidebarContext';

const Header = () => {
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const router = useRouter();
   const dropdownRef = useRef(null);
   const {isSidebarOpen, setIsSidebarOpen} = useContext(SidebarContext)

   const handleSidebarToggle = () => {
      setIsSidebarOpen(!isSidebarOpen);
   };

   const handleLogout = async () => {
      try {
         document.cookie = "cookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
         router.push('/');
      } catch (err) {
         console.error(err);
      }
   };

   const toggleDropdown = () => {
      setIsDropdownOpen(prev => !prev);
   };

   useEffect(() => {
      const handleClickOutside = (e) => {
         if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
         setIsDropdownOpen(false);
         }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   return (
      <header className="w-full px-6 py-1 bg-white/60 backdrop-blur-md border-b border-gray-200 shadow-sm z-50">
         <div className="max-w-7xl mx-auto flex items-center justify-between">
         {/* Left Side */}
         <div className="flex items-center gap-4">
            <button
               onClick={handleSidebarToggle}
               className="p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition"
               aria-label="Toggle Sidebar"
            >
               <FiMenu size={16} />
            </button>
            <h1 className="text-md font-semibold text-gray-800">Dashboard</h1>
         </div>

         {/* Right Side */}
         <div className="relative" ref={dropdownRef}>
            <button
               onClick={toggleDropdown}
               className="p-2 rounded-full text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition"
               aria-label="User Menu"
            >
               <FiUser size={20} />
            </button>

            {isDropdownOpen && (
               <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
               <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
               >
                  Logout
               </button>
               </div>
            )}
         </div>
         </div>
      </header>
   );
};

export default Header;

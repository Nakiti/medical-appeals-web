import React, { useState, useEffect, useRef } from 'react';
import { FiMenu, FiUser } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/services/authServices';

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const router = useRouter();
   const dropdownRef = useRef(null);

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

   // Close dropdown on outside click
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
      <header className="bg-gray-900 border-b border-gray-800 w-full px-6 py-4 flex items-center justify-between z-40">
         <div className="flex items-center space-x-4">
            <button
               onClick={handleSidebarToggle}
               className="text-xl focus:outline-none text-gray-300 hover:text-white transition-colors"
               aria-label="Toggle Sidebar"
            >
               <FiMenu />
            </button>
            <h1 className="text-lg font-bold tracking-wide text-white">Dashboard</h1>
         </div>

         <div className="relative" ref={dropdownRef}>
            <button
               onClick={toggleDropdown}
               className="flex items-center justify-center text-xl text-gray-300 hover:text-white focus:outline-none transition"
               aria-label="User Menu"
            >
               <FiUser />
            </button>

            {isDropdownOpen && (
               <div className="absolute right-0 mt-2 w-44 bg-gray-800 rounded-lg shadow-lg ring-1 ring-gray-700 animate-fadeIn">
                  <button
                     onClick={handleLogout}
                     className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-gray-700 transition"
                  >
                     Logout
                  </button>
               </div>
            )}
         </div>
      </header>

   );
};

export default Header;

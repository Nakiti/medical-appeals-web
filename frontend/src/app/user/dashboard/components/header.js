import React, { useState } from 'react';
import { FiMenu, FiUser } from 'react-icons/fi'; // Import profile icon
import Sidebar from './sidebar';
import { logout } from '@/app/services/authServices';
import { useRouter } from 'next/navigation';

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const router = useRouter();

   const handleSidebarToggle = () => {
      setIsSidebarOpen(!isSidebarOpen);
   };

   const handleLogout = async () => {
      try {
         document.cookie = "cookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
         router.push("/");
      } catch (err) {
         console.log(err);
      }
   };

   const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
   };

   return (
      <header className="bg-white border-b w-full shadow-lg text-black flex items-center justify-between p-3">
         <div className="flex items-center">
            <button
               onClick={handleSidebarToggle}
               className="text-xl mr-4 focus:outline-none"
               aria-label="Toggle Sidebar"
            >
               <FiMenu />
            </button>
            <h1 className="text-md font-semibold">My App</h1>
         </div>
         <div className="relative flex items-center">
            <button
               onClick={toggleDropdown}
               className="text-xl focus:outline-none"
               aria-label="User Menu"
            >
               <FiUser />
            </button>
            {isDropdownOpen && (
               <div className="absolute right-0 mt-24 w-48 bg-white text-black rounded-lg shadow-lg">
                  <button
                     onClick={handleLogout}
                     className="block w-full px-4 py-2 text-left hover:bg-gray-100"
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

import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi'; // Import icons from react-icons
import Sidebar from './sidebar';

const Header = ({isSidebarOpen, setIsSidebarOpen }) => {
   // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   const handleSidebarToggle = () => {
      setIsSidebarOpen(!isSidebarOpen);
   };

   return (
      <header className="bg-midnight w-full shadow-lg text-white flex items-center justify-between p-4">
         <div className="flex items-center">
            <button
               onClick={handleSidebarToggle}
               className="text-2xl mr-4 focus:outline-none"
               aria-label="Toggle Sidebar"
            >
               <FiMenu />
            </button>
            <h1 className="text-xl font-semibold">My App</h1>
         </div>
      </header>
   );
};

export default Header;

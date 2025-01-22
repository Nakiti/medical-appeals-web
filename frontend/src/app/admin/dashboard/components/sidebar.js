import React from 'react';
import { FaHome } from "react-icons/fa";
import { IoIosStats, IoIosSettings } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { RiDraftFill } from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";
import SidebarItem from '@/app/user/dashboard/components/sidebarItem';

const Sidebar = ({isOpen, setIsSidebarOpen }) => {
   return (
      <div 
         className={`w-64 min-h-screen bg-white border-r shadow-xl border-gray-200 transition-width duration-300 fixed md:relative z-50 py-4`}
         style={{ display: isOpen ? 'block' : 'none' }}
      >
         <div className={`${isOpen ? 'flex flex-col' : 'hidden'}`}>
            <SidebarItem icon={<FaHome className='h-full w-full' />} text="Home" isCollapsed={isOpen} link={`/admin/dashboard/home`} />
            <SidebarItem icon={<IoDocumentText className='h-full w-full' />} text="Appeals" isCollapsed={isOpen} link={`/admin/dashboard/appeals`} />
            <SidebarItem icon={<IoIosSettings className='h-full w-full' />} text="Settings" isCollapsed={isOpen} link={`/admin/dashboard/settings`} />
         </div>
      </div>
   );
};

export default Sidebar;

import React from 'react';
import { FaHome } from "react-icons/fa";
import { IoIosStats, IoIosSettings } from "react-icons/io";
import SidebarItem from './sidebarItem';
import { FaBell } from "react-icons/fa";
import { RiDraftFill } from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";

const Sidebar = ({isOpen, setIsSidebarOpen }) => {
   return (
      <div 
         className={`w-56 py-6 min-h-screen bg-white border-r shadow-xl border-gray-200 transition-width duration-300 fixed md:relative z-50`}
         style={{ display: isOpen ? 'block' : 'none' }}
      >
         <div className={`${isOpen ? 'flex flex-col' : 'hidden'}`}>
            <SidebarItem icon={<FaHome className='h-full w-full' />} text="Home" isCollapsed={isOpen} link={`/user/dashboard/home`} />
            <SidebarItem icon={<IoDocumentText className='h-full w-full' />} text="Appeals" isCollapsed={isOpen} link={`/user/dashboard/appeals`} />
            <SidebarItem icon={<RiDraftFill className='h-full w-full' />} text="Drafts" isCollapsed={isOpen} link={`/user/dashboard/drafts`} />
            <SidebarItem icon={<FaBell className='h-full w-full' />} text="Updates" isCollapsed={isOpen} link={`/user/dashboard/updates`} />
         </div>
         <div className={`border-t border-gray-200 mt-56 ${isOpen ? 'flex flex-col' : 'hidden'}`}>
            <SidebarItem icon={<IoIosSettings className='h-full w-full' />} text="Settings" isCollapsed={isOpen} link={`/user/dashboard/settings`} />
         </div>
      </div>
   );
};

export default Sidebar;

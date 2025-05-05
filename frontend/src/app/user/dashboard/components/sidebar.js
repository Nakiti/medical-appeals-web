import React from 'react';
import { FaHome, FaBell } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { RiDraftFill } from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";
import SidebarItem from './sidebarItem';

const Sidebar = ({ isOpen, setIsSidebarOpen }) => {
  return (
    <aside
      className={`w-56 min-h-screen bg-white border-r border-gray-200 shadow-md transition-all duration-300 fixed md:relative z-50 px-3 py-6`}
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      {/* Main navigation */}
      <div className="space-y-2">
        <SidebarItem icon={<FaHome />} text="Home" isCollapsed={isOpen} link="/user/dashboard/home" />
        <SidebarItem icon={<IoDocumentText />} text="Appeals" isCollapsed={isOpen} link="/user/dashboard/appeals" />
        <SidebarItem icon={<RiDraftFill />} text="Drafts" isCollapsed={isOpen} link="/user/dashboard/drafts" />
        <SidebarItem icon={<FaBell />} text="Updates" isCollapsed={isOpen} link="/user/dashboard/updates" />
      </div>

      {/* Divider */}
      <div className="mt-10 pt-6 border-t border-gray-100 space-y-2">
        <SidebarItem icon={<IoIosSettings />} text="Settings" isCollapsed={isOpen} link="/user/dashboard/settings" />
      </div>
    </aside>
  );
};

export default Sidebar;

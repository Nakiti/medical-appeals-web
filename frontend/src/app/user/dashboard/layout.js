"use client"
import React, { useState, useRef, use, useContext } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { AuthContext } from "@/app/context/authContext";

const DashboardLayout = ({ children }) => {
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const sidebarRef = useRef(null);
   const {currentUser} = useContext(AuthContext)

   return (
      <div className="flex flex-col w-full">
         <Header setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />

         <div className="flex">
            <Sidebar userId={currentUser} isOpen={isSidebarOpen} ref={sidebarRef} setIsSidebarOpen={setIsSidebarOpen} />
            <div className={`flex-1 bg-gray-50 overflow-x-hidden min-h-screen transition-all duration-300 ${isSidebarOpen ? 'sm:opacity-50 md:opacity-100' : 'sm:opacity-100'}`}>
               {children}
            </div>
         </div>
      </div>
   );
};

export default DashboardLayout;

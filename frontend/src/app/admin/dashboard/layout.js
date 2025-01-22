"use client"
import Sidebar from "./components/sidebar"
import Header from "./components/header"
import { useState, useRef } from "react";

const DashboardLayout = ({children}) => {
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   const sidebarRef = useRef(null);

   return (
      <div className="flex flex-col w-full">
         <Header setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />

         <div className="flex">
            <Sidebar isOpen={isSidebarOpen} ref={sidebarRef} setIsSidebarOpen={setIsSidebarOpen} />
            {/* Main Content */}
            <div className={`flex-1 bg-white overflow-x-hidden min-h-screen transition-all duration-300 ${isSidebarOpen ? 'sm:opacity-50 md:opacity-100' : 'opacity-none'}`}>
               {children}
            </div>
         </div>
      </div>
   )
}

export default DashboardLayout
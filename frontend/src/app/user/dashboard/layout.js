"use client"
import React, { useState, useRef, use, useContext } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { AuthContext } from "@/app/context/authContext";
import { SidebarContext } from "@/app/context/sidebarContext";

const DashboardLayout = ({ children }) => {
   const sidebarRef = useRef(null);
   const {currentUser} = useContext(AuthContext)
   const {isSidebarOpen} = useContext(SidebarContext)

   return (
      <div className="flex flex-col w-full">
         <Header />

         <div className="flex">
            <Sidebar userId={currentUser} isOpen={isSidebarOpen} ref={sidebarRef} />
            <div className={`flex-1 bg-slate-100 overflow-x-hidden min-h-screen transition-all duration-300 ${isSidebarOpen ? 'sm:opacity-50 md:opacity-100' : 'sm:opacity-100'}`}>
               {children}
            </div>
         </div>
      </div>
   );
};

export default DashboardLayout;

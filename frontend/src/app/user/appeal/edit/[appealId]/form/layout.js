"use client"
import React, { useState } from 'react';
import { use, useContext } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { FormContextProvider } from '@/app/context/formContext';
import ProgressBar from '../components/progressBar';
import Footer from '../components/footer';
import Link from 'next/link';
import { AuthContext } from '@/app/context/authContext';
import Navbar from '../components/navbar';

const AppealFormLayout = ({ params, children }) => {
   const unwrappedParams = use(params)
   const appealId = unwrappedParams.appealId;
   const { currentUser } = useContext(AuthContext)
   const [loading, setLoading] = useState(false);

   return (
      <div className="flex flex-col min-h-screen bg-gray-100">
         {loading && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex flex-col justify-center items-center z-50">
               <div className="animate-spin rounded-full mb-4 border-4 border-t-4 border-gray-200 w-24 h-24"></div>
               <p className='text-2xl text-white'>Parsing Data</p>
            </div>
         )}

         <header className="bg-midnight w-full text-white flex items-center justify-between p-4">
            <div className="flex items-center">
               <h1 className="text-xl font-semibold">My App</h1>
            </div>
         </header>

         <div className="flex-1 py-6 bg-white max-w-5xl w-full mx-auto shadow-xl">
            <Navbar />

            <ProgressBar userId={currentUser} appealId={appealId} />

            {children}
            <Footer userId={currentUser} appealId={appealId} setLoading={setLoading}/>
         </div>
      </div>
   );
};

export default AppealFormLayout;

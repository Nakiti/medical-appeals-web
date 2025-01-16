"use client"
import React from 'react';
import { use, useContext } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { FormContextProvider } from '@/app/context/formContext';
import ProgressBar from './components/progressBar';
import Footer from './components/footer';
import Link from 'next/link';
import { AuthContext } from '@/app/context/authContext';


const AppealFormLayout = ({ params, children }) => {
   const unwrappedParams = use(params)
   const appealId = unwrappedParams.appealId;
   const {currentUser} = useContext(AuthContext)

   return (
      <FormContextProvider appealId={appealId}>
         <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Header Component */}
            <header className="bg-blue-600 w-full text-white flex items-center justify-between p-4">
               <div className="flex items-center">
                  <h1 className="text-xl font-semibold">My App</h1>
               </div>
            </header>

            {/* Progress Bar with Navigation Buttons */}

            {/* Form Content */}
            <div className="flex-1 py-6 bg-white max-w-5xl w-full mx-auto shadow-xl">
               <div className='space-y-2 ml-4 md:ml-8 md:mb-4'>
                  <Link href={`/user/dashboard/home`} className='flex flex-row items-center space-x-2'>
                     <FaArrowLeft /> 
                     <p className='text-xs md:text-sm'>Back to Home</p>
                  </Link>
                  <h1 className='text-lg md:text-2xl'>Appeal Internal Name</h1>
               </div>

               <ProgressBar userId={currentUser} appealId={appealId}/>


               {children}
               <Footer userId={currentUser} appealId={appealId}/>
            </div>
         </div>
      </FormContextProvider>
   );
};

export default AppealFormLayout;

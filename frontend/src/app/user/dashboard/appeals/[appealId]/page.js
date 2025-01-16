"use client";
import React, { useEffect, useState, use } from 'react';
import { getAppeal } from '@/app/services/fetchServices';
import { AiOutlineFileText, AiOutlineHourglass, AiOutlineCheckCircle } from 'react-icons/ai';
import { FaBell } from "react-icons/fa";
import Link from 'next/link';

const AppealScreen = ({ params }) => {
   const [data, setData] = useState(null);
   const statuses = ["Submitted", "Under Review", "Decision Made"];
   const barColor = "bg-blue-600"; // More vibrant blue for the filled part of the bar
   const barBackgroundColor = "bg-gray-300"; // Slightly lighter gray for the unfilled part
   const unwrappedParams = use(params);
   const appealId = unwrappedParams.appealId;

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await getAppeal(appealId);
            setData(response);
         } catch (err) {
            console.log(err);
         }
      };

      fetchData();
   }, [appealId]);

   const renderProgressBar = () => {
      const currentStatusIndex = statuses.findIndex(status => status === data.status);
      const barWidthPercentage = ((currentStatusIndex + 1) / statuses.length) * 100;

      return (
         <div className={`w-full h-6 rounded-full overflow-hidden mt-6 ${barBackgroundColor}`}>
            <div className={`h-full ${barColor}`} style={{ width: `${barWidthPercentage}%` }} />
         </div>
      );
   };

   return (
      <div className="p-8 bg-gray-50 min-h-screen">
         {data && (
            <div>
               <div className="mb-8 flex flex-row justify-between items-center">
                  <div>
                     <h1 className="text-3xl font-semibold text-gray-900">Appeal #: {data.claim_number}</h1>
                     <p className="text-gray-700 text-md">Submitted on {new Date(data.date_filed).toLocaleDateString("en-US")}</p>
                  </div>
                  <Link href={`/user/dashboard/appeals/${appealId}/updates`} className='flex flex-col items-center space-y-2'>
                     <FaBell size={24}/>
                     <p>Updates</p>
                  </Link>
               </div>
               <div className="bg-white p-8 rounded-md shadow-sm mb-8">
                  <p className="text-gray-500 text-center mb-3 uppercase tracking-wider">Status:</p>
                  <p className="text-4xl font-bold text-center text-blue-700 mb-4">{data.status}</p>
                  {renderProgressBar()}
                  <div className="flex justify-around mt-6">
                     {statuses.map((status, index) => {
                        const Icon = index === 0 ? AiOutlineFileText : index === 1 ? AiOutlineHourglass : AiOutlineCheckCircle;
                        return (
                           <div key={index} className="text-center flex flex-col justify-center items-center">
                              <Icon className={`text-3xl ${index <= statuses.findIndex(s => s === data.status) ? 'text-blue-600' : 'text-gray-400'}`} />
                              <p className="text-sm mt-2 text-gray-600">{status}</p>
                           </div>
                        );
                     })}
                  </div>
               </div>
               <div className="mt-8">
                  <h2 className="text-xl font-bold text-gray-800">Your Appeal</h2>
                  <div className="flex items-center p-6 bg-white rounded-md shadow-md mt-2">
                     <div className="w-12 h-12 bg-gray-300 rounded-full mr-6" />
                     <p className="text-gray-800">Additional details about the appeal...</p>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default AppealScreen;

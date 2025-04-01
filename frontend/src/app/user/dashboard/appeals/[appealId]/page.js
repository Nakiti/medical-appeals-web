"use client";
import React, { useEffect, useState, use } from 'react';
import { getAppeal, getFilesByAppeal } from '@/app/services/fetchServices';
import { AiOutlineFileText, AiOutlineHourglass, AiOutlineCheckCircle } from 'react-icons/ai';
import Link from 'next/link';

const AppealScreen = ({ params }) => {
   const [data, setData] = useState(null);
   const statuses = ["Submitted", "Under Review", "Decision Made"];
   const barColor = "bg-indigo-500"; // Muted, professional blue
   const barBackgroundColor = "bg-gray-200"; // Light gray for background
   const unwrappedParams = use(params);
   const appealId = unwrappedParams.appealId;
   const [files, setFiles] = useState(null)

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await getAppeal(appealId);
            setData(response);

            const filesResponse = await getFilesByAppeal(appealId)
            setFiles(filesResponse)
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
         <div className={`w-full h-4 rounded-full overflow-hidden mt-4 ${barBackgroundColor}`}>
            <div className={`h-full ${barColor}`} style={{ width: `${barWidthPercentage}%` }} />
         </div>
      );
   };

   return (
      <div className="p-6 min-h-screen">
         {data && (
            <div className="md:p-8 p-4">
               <div className="mb-6 md:w-3/4 mx-auto">
                  <p className="text-sm text-gray-600 text-center uppercase tracking-wide">Status</p>
                  <p className="text-2xl font-semibold text-center text-indigo-600 mb-4">{data.status}</p>
                  {renderProgressBar()}
                  <div className="flex justify-between mt-6">
                     {statuses.map((status, index) => {
                        const Icon = index === 0 ? AiOutlineFileText : index === 1 ? AiOutlineHourglass : AiOutlineCheckCircle;
                        return (
                           <div key={index} className="text-center flex flex-col items-center">
                              <Icon className={`text-2xl ${index <= statuses.findIndex(s => s === data.status) ? 'text-indigo-500' : 'text-gray-400'}`} />
                              <p className="text-xs mt-2 text-gray-500">{status}</p>
                           </div>
                        );
                     })}
                  </div>
               </div>
               <div>
                  <h2 className="text-lg font-semibold text-gray-700">Your Appeal</h2>
                  <div className="flex items-center p-4 bg-gray-100 rounded-md shadow-inner mt-4">
                     <div className="w-12 h-12 bg-gray-300 rounded-sm mr-6" />
                     <p className="text-gray-700">Appeal File (temp)</p>
                  </div>
               </div>
               <div>
                  <h2 className="text-lg font-semibold text-gray-700 mt-4">Relevant Files</h2>
                  {files && files.map((item, index) => (
                     <div key={index} className="flex items-center p-4 bg-gray-100 rounded-md shadow-inner mt-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-sm mr-6" />
                        <p className="text-gray-700">Appeal File (temp)</p>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
};

export default AppealScreen;

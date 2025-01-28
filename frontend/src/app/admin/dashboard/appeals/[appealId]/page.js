"use client";
import React, { useState, useEffect } from "react";
import { FaFileAlt } from "react-icons/fa";
import { getAppeal, getFilesByAppeal } from "@/app/services/fetchServices";
import Input from "./components/input";
import { use } from "react";

const AppealPage = ({ params }) => {
   const unwrappedParams = use(params)
   const appealId = unwrappedParams.appealId
   const [data, setData] = useState(null);
   const [files, setFiles] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const appealResponse = await getAppeal(appealId);
            setData(appealResponse);

            const filesResponse = await getFilesByAppeal(appealId);
            setFiles(filesResponse);
         } catch (err) {
            console.error(err);
         }
      };

      fetchData();
   }, [appealId]);

   return (
      <div className="min-h-screen bg-white">
         {/* Appeal Information Section */}
         <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Appeal Information</h2>
            {data && (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Input title="Claim Number" value={data.claim_number || "-"} />
                  <Input title="Insurance Provider" value={data.insurance_provider || "-"} />
                  <Input title="Policy Number" value={data.policy_number || "-"} />
                  <Input title="Procedure Name" value={data.procedure_name || "-"} />
                  <Input title="Denial Reason" value={data.denial_reason || "-"} />
                  <Input title="Date Filed" value={new Date(data.date_filed).toLocaleDateString("en-US") || "-"} />
               </div>
            )}
         </div>

         {/* File Upload Section */}
         <div className="px-8 pb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">File Uploads</h2>
            <div className="space-y-4">
               {files &&
                  files.map((document, index) => (
                     <a
                        key={index}
                        href={document.blob_url || URL.createObjectURL(document)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                     >
                        <FaFileAlt className="text-gray-500 mr-4" size={24} />
                        <p className="text-gray-700 text-sm truncate">{document.file_name || document.name}</p>
                     </a>
                  ))}
            </div>
         </div>
      </div>
   );
};

export default AppealPage;

"use client"
import React from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { useState, useEffect, use } from 'react';
import { getAppeal, getFilesByAppeal } from '@/app/services/fetchServices';
import Input from './components/input';

const AppealPage = ({params}) => {
   const unwrappedParams = use(params)
   const appealId = unwrappedParams.appealId
   const [data, setData] = useState(null)
   const [files, setFiles] = useState(null)

   useEffect(() => {
      const fetchData = async() => {
         try {
            const response = await getAppeal(appealId)
            setData(response)
            
            const filesResponse = await getFilesByAppeal(appealId)
            setFiles(filesResponse)
         } catch (err) {
            console.log(err)
         }
      }

      fetchData()
   }, [])

   return (
      <div className=''>
         {/* Appeal Information Section */}
         <div className="p-8">
            <h2 className="text-xl mb-4">Appeal Information</h2>
            
            {data && <div className='grid grid-cols-3 gap-4'>
               <Input title={"Claim Number"} value={data.claim_number || "-"}/>
               <Input title={"Insurance Provider"} value={data.insurance_provider || "-"}/>
               <Input title={"Policy Number"} value={data.policy_number || "-"}/>
               <Input title={"Procedure Name"} value={data.procedure_name || "-"}/>
               <Input title={"Denial Reason"} value={data.denial_reason || "-"}/>
               <Input title={"Date Filed"} value={new Date(data.date_filed).toLocaleDateString("en-US") || "-"}/>
            </div>}
         </div>

         <div className="px-8 pb-8 space-y-2">
            <h2 className="text-xl mb-4">File Uploads</h2>
            <div className="space-y-2 mb-12 mt-8">
               {files && files.map((document, index) => (
                  <a
                     key={index}
                     href={document.blob_url || URL.createObjectURL(document)}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="w-full flex flex-row items-center overflow-hidden border-2 rounded-lg"
                  >
                     <FaFileAlt size={48} />
                     <p className="text-md p-4">{document.file_name || document.name}</p>
                  </a>
               ))}
            </div>
         </div>
      </div>
   );
}

export default AppealPage;

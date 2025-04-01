"use client"
import React, { useContext } from 'react';
import { FormContext } from '@/app/context/formContext';

const Summary = () => {
   const {inputs, documents} = useContext(FormContext)

   console.log("documents", documents)

   const renderInfoGroup = (label, value) => (
      <div className="">
         <label className="block text-sm font-semibold text-gray-600 mb-1">{label}</label>
         <p className="w-full bg-gray-100 rounded-sm py-2 px-4 text-base text-gray-800">{value || 'N/A'}</p>
      </div>
   );

   return (
      <div className="min-h-screen flex flex-col">
         <div className="px-6 pb-8 max-w-4xl mx-auto w-full">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Summary</h1>
            <div className='grid md:grid-cols-2 gap-4'>
               {renderInfoGroup('First Name', inputs.firstName)}
               {renderInfoGroup('Last Name', inputs.lastName)}
               {renderInfoGroup('Claim Number', inputs.claimNumber)}
               {renderInfoGroup('SSN', inputs.ssn)}
               {renderInfoGroup('Date of Birth', inputs.dob)}
               {renderInfoGroup('Insurance Provider', inputs.insuranceProvider)}
               {renderInfoGroup('Policy Number', inputs.policyNumber)}
               {renderInfoGroup('Procedure Name', inputs.procedureName)}
               {renderInfoGroup('Denial Reason', inputs.denialReason)}
               {renderInfoGroup('Additional Details', inputs.additionalDetails)}
            </div>

            <label className="block text-sm font-semibold text-gray-600 mt-6">Documents</label>
            {documents.map((item, index) => (
               <div className="flex items-center bg-white rounded-lg p-4 mb-4 shadow" key={index}>
                  <img src={item.uri} alt={item.name} className="w-12 h-12 rounded-lg mr-4" />
                  <p className="text-sm text-gray-800">{item.file_name || item.name || item.file?.name || "File"}</p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Summary;

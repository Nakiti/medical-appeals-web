"use client"
import React, { useContext } from 'react';
import { FormContext } from '@/app/context/formContext';

const ProcedureDetails = ({ navigation }) => {
   const {inputs, handleInputsChange} = useContext(FormContext)

   return (
      <div 
         className="flex flex-col min-h-screen" 
         // onClick={() => document.activeElement.blur()}
      >
         <div className="flex-1 px-5 py-2 max-w-4xl w-full mx-auto">
            <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">Procedure Details</h1>
            <p className="text-md text-center text-gray-600 mb-8">
               Please fill out the details below to proceed with the form submission.
            </p>

            {/* Form Fields */}
            <div className="space-y-4">
               <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                     Procedure Name
                  </label>
                  <input
                     type="text"
                     className="w-full bg-gray-100 rounded-sm py-2 px-4 text-base text-gray-800"
                     placeholder="Enter Procedure Name"
                     name='procedureName'
                     value={inputs.procedureName}
                     onChange={handleInputsChange}
                  />
               </div>

               <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                     Reason For Denial
                  </label>
                  <textarea
                     className="w-full bg-gray-100 rounded-sm py-2 px-4 text-base text-gray-800 h-56"
                     placeholder="Enter Reason For Denial"
                     name='denialReason'
                     value={inputs.denialReason}
                     onChange={handleInputsChange}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProcedureDetails;

"use client"
import React, { useContext } from 'react';
import { FormContext } from '@/app/context/formContext';

const AdditionalDetails = ({  }) => {
   const {inputs, handleInputsChange} = useContext(FormContext)

   return (
      <div className="flex flex-col min-h-screen bg-white">
         <div className="flex-1 px-5 py-2 max-w-4xl w-full mx-auto">
            <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">Additional Details</h1>
            <p className="text-md text-center text-gray-600 mb-8">
               Please enter any other relevant details to your appeal
            </p>

            <div className="space-y-4">
               <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                     Details
                  </label>
                  <textarea
                     className="w-full bg-gray-100 rounded-sm py-2 px-4 text-base text-gray-800 h-72"
                     placeholder="Enter Details"
                     name="additionalDetails"
                     value={inputs.additionalDetails}
                     onChange={handleInputsChange}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default AdditionalDetails;

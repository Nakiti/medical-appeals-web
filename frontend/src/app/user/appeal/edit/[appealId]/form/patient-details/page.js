"use client"
import React, { useContext, useState } from 'react';
import { FormContext } from '@/app/context/formContext';

const PatientDetails = ({ navigation }) => {
   const {inputs, handleInputsChange} = useContext(FormContext)

   return (
      <div className="flex flex-col min-h-screen">
         <div className="flex-1 px-5 py-8 max-w-4xl w-full mx-auto">
            <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">Patient Details</h1>
            <p className="text-md text-center text-gray-600 mb-8">
               Please fill out the details below to proceed with the form submission.
            </p>
            <div>
            </div>
            {/* Form Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
               <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700">First Name</label>
                  <input
                     type="text"
                     className="w-full bg-gray-100 rounded-sm py-2 px-4 text-base text-gray-800"
                     placeholder="Enter First Name"
                     name='firstName'
                     value={inputs.firstName}
                     onChange={handleInputsChange}
                  />
               </div>

               <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700">Last Name</label>
                  <input
                     type="text"
                     className="w-full bg-gray-100 rounded-sm py-2 px-4 text-base text-gray-800"
                     placeholder="Enter Last Name"
                     name='lastName'
                     value={inputs.lastName}
                     onChange={handleInputsChange}
                  />
               </div>

               <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700">Claim Number</label>
                  <input
                     type=""
                     className="w-full bg-gray-100 rounded-sm py-2 px-4 text-base text-gray-800"
                     placeholder="Enter Claim Number"
                     name="claimNumber"
                     value={inputs.claimNumber}
                     onChange={handleInputsChange}
                  />
               </div>

               <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700">SSN</label>
                  <input
                     type=""
                     className="w-full bg-gray-100 rounded-sm py-2 px-4 text-base text-gray-800"
                     placeholder="Enter SSN"
                     name='ssn'
                     value={inputs.ssn}
                     onChange={handleInputsChange}
                  />
               </div>

               <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700">Date of Birth</label>
                  <input
                     type=""
                     className="w-full bg-gray-100 rounded-sm py-2 px-4 text-base text-gray-800"
                     placeholder="Enter Date of Birth"
                     name='dob'
                     value={inputs.dob}
                     onChange={handleInputsChange}
                  />
               </div>

               <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700">Policy Number</label>
                  <input
                     type=""
                     className="w-full bg-gray-100 rounded-sm py-2 px-4 text-base text-gray-800"
                     placeholder="Enter Policy Number"
                     name='policyNumber'
                     value={inputs.policyNumber}
                     onChange={handleInputsChange}
                  />
               </div>

               <div className="space-y-2 md:col-span-4">
                  <label className="block text-sm font-semibold text-gray-700">Insurer</label>
                  <input
                     type="text"
                     className="w-full bg-gray-100 rounded-sm py-2 px-4 text-base text-gray-800"
                     placeholder="Enter Insurer"
                     name='insuranceProvider'
                     value={inputs.insuranceProvider}
                     onChange={handleInputsChange}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default PatientDetails;

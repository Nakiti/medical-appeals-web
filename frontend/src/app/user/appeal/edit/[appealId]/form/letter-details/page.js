"use client"
import React, { useContext, useState } from 'react';
import { FormContext } from '@/app/context/formContext';
import CustomInput from '@/app/components/customInput';

const PatientDetails = ({ navigation }) => {
   const {inputs, handleInputsChange} = useContext(FormContext)

   return (
      <div className="flex flex-col min-h-screen">
         <div className="flex-1 px-5 py-8 max-w-4xl w-full mx-auto">
            <h1 className="text-2xl text-center font-bold text-gray-800 mb-2">Letter Details</h1>
            <p className="text-md text-center text-gray-600 mb-8">
               Please fill out the details below to proceed with the form submission.
            </p>
            <div>
            </div>
            {/* Form Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-4 gap-y-8">
               <div className="md:col-span-2">
                  <CustomInput name="insuranceProvider" placeholder="Enter Insurance Company Name" value={inputs.insuranceAddress} label="Insurance Provider" handleInputsChange={handleInputsChange}/>
               </div>
               <div className="md:col-span-2">
                  <CustomInput name="insuranceAddress" placeholder="Enter Insurance Address" value={inputs.insuranceAddress} label="Insurance Address" handleInputsChange={handleInputsChange}/>
               </div>
               <div className="md:col-span-2">
                  <CustomInput name="physicianName" placeholder="Enter Physician Name" value={inputs.physicianName} label="Physician Name" handleInputsChange={handleInputsChange}/>
               </div>
               <div className="md:col-span-2">
                  <CustomInput name="physicianPhone" placeholder="Enter Physician Phone Number" value={inputs.physicianPhone} label="Physician Phone Number" handleInputsChange={handleInputsChange}/>
               </div>
               <div className="md:col-span-2">
                  <CustomInput name="physicianAddress" placeholder="Enter Physician Address" value={inputs.physicianAddress} label="Physician Address" handleInputsChange={handleInputsChange}/>
               </div>
               <div className="md:col-span-2">
                  <CustomInput name="physicianEmail" placeholder="Enter Physician Email" value={inputs.physicianEmail} label="Physician Email" handleInputsChange={handleInputsChange}/>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PatientDetails;

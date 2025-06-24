"use client"
import { useContext, useMemo, useState } from "react"
import { FormContext } from "@/app/context/formContext"
import FormInput from "../../components/input"

const ProcedureDetailsPage = () => {
   const {inputs, handleInputsChange, status} = useContext(FormContext)
   const [isSaving, setIsSaving] = useState(false);
   const [initialInputs, setInitialInputs] = useState({});
   
   const isChanged = useMemo(() => {
      return JSON.stringify(inputs) !== JSON.stringify(initialInputs);
   }, [inputs, initialInputs]);

   const handleSave = () => {

   }

   return (
      <div className="w-full max-w-4xl mx-auto py-4 px-6">
         <h1 className="text-2xl font-light text-gray-900 mb-1">Procedure Details</h1>
         <h3 className="text-md text-gray-600 mb-4">Information About the Procedure</h3>
         
         {/* Form Grid */}
         <div className="grid grid-cols-1 gap-4 w-full">
            {/* Campaign Name */}
            <FormInput
               label="Procedure Name"
               name="procedureName"
               value={inputs.procedureName}
               onChange={handleInputsChange}
               placeholder="Enter Procedure Name"
               required
            />

            <div className="flex flex-col">
               <label className="text-gray-600 text-sm font-semibold mb-2">
                  Denial Reason <span className="text-red-500">*</span>
               </label>
               <textarea
                  rows={4}
                  name="denialReason"
                  value={inputs.denialReason}
                  onChange={handleInputsChange}
                  placeholder="Enter the reason for the denial"
                  className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out resize-none"
                  disabled={status != "draft"}
               />
            </div>

            <div className="flex flex-col">
               <label className="text-gray-600 text-sm font-semibold mb-2">
                  Additional Information <span className="text-red-500">*</span>
               </label>
               <textarea
                  rows={4}
                  name="additionalDetails"
                  value={inputs.additionalDetails}
                  onChange={handleInputsChange}
                  placeholder="Enter additional information relevant to the appeal..."
                  className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out resize-none"
                  disabled={status != "draft"}
               />
            </div>
         </div>

         <div className="w-full flex flex-row mt-6">
            <button
               onClick={handleSave}
               disabled={!isChanged || isSaving || status != "draft"}
               className={`ml-auto px-6 py-3 w-40 rounded-md shadow-sm text-md text-white transition cursor-pointer
                  ${!isChanged || isSaving || status != "draft" ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}
               `}
            >
               {isSaving ? "Saving..." : status !== "draft" ? "Submitted" : "Save"}
            </button>
         </div>
      </div>
   )
}

export default ProcedureDetailsPage
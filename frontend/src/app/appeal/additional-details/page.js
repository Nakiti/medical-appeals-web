"use client"
import NavigationButtons from "../components/nextButton"
import { useContext } from "react"
import { FormContext } from "@/app/context/formContext"

const AdditionalDetailsPage = () => {
   const {inputs, handleInputsChange} = useContext(FormContext)
   
   return (
      <div className="w-full flex items-center justify-center py-4">
         <div className="w-1/2 mx-auto">
            <div className="mb-4">
               <p className="text-xl text-left">Anything Else?</p>
               <p className="text-3xl font-semibold text-left">
                  Provide Any Details Relevant to Your Appeal
               </p>
            </div>

            <div className="space-y-4">
               <div className="space-y-2">
                  <label className="text-md font-bold mb-2">
                     Additional Details
                  </label>
                  <textarea
                     className="w-full bg-white rounded-md py-2 px-4 text-base text-gray-800 h-56 border border-gray-600 shadow-sm "
                     placeholder="Enter Additional Details"
                     name='additionalDetails'
                     value={inputs.additionalDetails}
                     onChange={handleInputsChange}
                  />
               </div>
            </div>

            <NavigationButtons backHref="/appeal/procedure-details" nextHref="/appeal/summary"/>
         </div>
      </div>  
   )
}

export default AdditionalDetailsPage
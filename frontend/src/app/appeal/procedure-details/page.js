"use client"
import Link from "next/link"
import DefaultInput from "../components/defaultInput"
import { useContext } from "react"
import { FormContext } from "@/app/context/formContext"
import NavigationButtons from "../components/nextButton"

const ProcedureDetailsPage = () => {
   const {inputs, handleInputsChange} = useContext(FormContext)

   return (
      <div className="w-full flex items-center justify-center py-4">
         <div className="w-1/2 mx-auto">
            <div className="mb-4">
               <p className="text-xl text-left">Provide Additional Information</p>
               <p className="text-3xl font-semibold text-left">
                  Briefy Explain the Procedure and Denial Reason
               </p>
            </div>

            <div className="space-y-4">
               <DefaultInput label="Procedure Name" handleInputsChange={handleInputsChange} name="procedureName" value={inputs.procedureName} placeholder="Enter Procedure Name" />
               <div className="space-y-2">
                  <label className="text-md font-bold mb-2">
                     Reason For Denial
                  </label>
                  <textarea
                     className="w-full bg-white rounded-md py-2 px-4 text-base text-gray-800 h-56 border border-gray-600 shadow-sm "
                     placeholder="Enter Reason For Denial"
                     name='denialReason'
                     onChange={handleInputsChange}
                     value={inputs.denialReason}
                  />
               </div>
            </div>

            <NavigationButtons backHref="/appeal/letter-details" nextHref="/appeal/additional-details"/>
         </div>
      </div>      
   )

}

export default ProcedureDetailsPage
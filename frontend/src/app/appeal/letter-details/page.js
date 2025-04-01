"use client"
import DefaultInput from "../components/defaultInput"
import { useContext } from "react"
import { FormContext } from "@/app/context/formContext"
import Link from "next/link"
import NavigationButtons from "../components/nextButton"

const LetterDetailsPage = () => {
   const {inputs, handleInputsChange} = useContext(FormContext)

   return (
      <div className="w-full flex items-center justify-center py-8">
         <div className="w-1/2 mx-auto">
            <div className="mb-4">
               <p className="text-xl text-left">Verify Details</p>
               <p className="text-3xl font-semibold text-left">
                  Fill In The Letter's Details
               </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <DefaultInput label="Insurance Provider" value={inputs.insuranceProvider} placeholder="Enter Insurance Provider" name="insuranceProvider" handleInputsChange={handleInputsChange}/>
               <DefaultInput label="Insurance Address" value={inputs.insuranceAddress} placeholder="Enter Insurance Address" name="insuranceAddress" handleInputsChange={handleInputsChange}/>
               <DefaultInput label="Physician Name" value={inputs.physicianName} placeholder="Enter Physician Name" name="physicianName" handleInputsChange={handleInputsChange}/>
               <DefaultInput label="Physician Phone Number" value={inputs.physicianPhone} placeholder="Enter Phone Number" name="physicianPhone" handleInputsChange={handleInputsChange}/>
               <DefaultInput label="Physican Address" value={inputs.physicianAddress} placeholder="Enter First Name" name="physicianAddress" handleInputsChange={handleInputsChange}/>
               <DefaultInput label="Physican Email" value={inputs.physicianEmail} placeholder="Enter Physician Email" name="physicianEmail" handleInputsChange={handleInputsChange} />
            </div>

            <NavigationButtons backHref="/appeal/patient-details" nextHref="/appeal/procedure-details"/>
         </div>
      </div>
   )

}

export default LetterDetailsPage
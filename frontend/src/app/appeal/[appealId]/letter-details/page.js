"use client"
import { useContext } from "react"
import { FormContext } from "@/app/context/formContext"
import NavigationButtons from "../../components/nextButton"
import DefaultInput from "../../components/defaultInput"

const LetterDetailsPage = () => {
   const { inputs, handleInputsChange, appealId } = useContext(FormContext)

   return (
      <div className="w-full flex items-center justify-center px-4 py-8">
         <div className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2">
            <div className="mb-4">
               <p className="text-lg sm:text-xl text-left">Verify Details</p>
               <p className="text-2xl sm:text-3xl font-semibold text-left">
                  Fill In The Letter's Details
               </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <DefaultInput
                  label="Insurance Provider"
                  value={inputs.insuranceProvider}
                  placeholder="Enter Insurance Provider"
                  name="insuranceProvider"
                  handleInputsChange={handleInputsChange}
               />
               <DefaultInput
                  label="Insurance Address"
                  value={inputs.insuranceAddress}
                  placeholder="Enter Insurance Address"
                  name="insuranceAddress"
                  handleInputsChange={handleInputsChange}
               />
               <DefaultInput
                  label="Physician Name"
                  value={inputs.physicianName}
                  placeholder="Enter Physician Name"
                  name="physicianName"
                  handleInputsChange={handleInputsChange}
               />
               <DefaultInput
                  label="Physician Phone Number"
                  value={inputs.physicianPhone}
                  placeholder="Enter Phone Number"
                  name="physicianPhone"
                  handleInputsChange={handleInputsChange}
               />
               <DefaultInput
                  label="Physician Address"
                  value={inputs.physicianAddress}
                  placeholder="Enter Physician Address"
                  name="physicianAddress"
                  handleInputsChange={handleInputsChange}
               />
               <DefaultInput
                  label="Physician Email"
                  value={inputs.physicianEmail}
                  placeholder="Enter Physician Email"
                  name="physicianEmail"
                  handleInputsChange={handleInputsChange}
               />
            </div>

            <NavigationButtons
               backHref={`/appeal/${appealId}/patient-details`}
               nextHref={`/appeal/${appealId}/procedure-details`}
            />
         </div>
      </div>
   )
}

export default LetterDetailsPage

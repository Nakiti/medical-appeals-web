"use client"
import DefaultInput from "../../components/defaultInput"
import { useContext, useEffect } from "react"
import { FormContext } from "@/app/context/formContext"
import { useRouter, useSearchParams } from "next/navigation"
import NavigationButtons from "../../components/nextButton"

const PatientDetailsPage = () => {
   const {inputs, handleInputsChange, setInputs, appealId} = useContext(FormContext)
   const router = useRouter()


   return (
      <div className="w-full flex items-center justify-center py-8">
         <div className="w-1/2 mx-auto">
            <div className="mb-4">
               <p className="text-xl text-left">Verify Details</p>
               <p className="text-3xl font-semibold text-left">
                  Fill In Your Details
               </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <DefaultInput label="First Name" value={inputs.firstName} placeholder="Enter First Name" name="firstName" handleInputsChange={handleInputsChange}/>
               <DefaultInput label="Last Name"value={inputs.lastName} placeholder="Enter Last Name" name="lastName" handleInputsChange={handleInputsChange}/>
               <DefaultInput label="SSN" value={inputs.ssn} placeholder="Enter SSN" name="ssn" handleInputsChange={handleInputsChange}/>
               <DefaultInput label="Policy Number" value={inputs.policyNumber} placeholder="Enter Policy Number" name="policyNumber" handleInputsChange={handleInputsChange}/>
               <DefaultInput label="Date of Birth" value={inputs.dob} placeholder="Enter Date of Birth" name="dob" handleInputsChange={handleInputsChange}/>
            </div>

            <NavigationButtons backHref={`/appeal/${appealId}/form-upload`} nextHref={`/appeal/${appealId}/letter-details`}/>
         </div>
      </div>
   )

}

export default PatientDetailsPage
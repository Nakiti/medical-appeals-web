"use client"
import DefaultInput from "../../components/defaultInput"
import { useContext } from "react"
import { FormContext } from "@/app/context/formContext"
import { useRouter } from "next/navigation"
import NavigationButtons from "../../components/nextButton"

const PatientDetailsPage = () => {
   const { inputs, handleInputsChange, appealId } = useContext(FormContext)
   const router = useRouter()

   return (
      <div className="w-full flex items-center justify-center px-4 py-4">
         <div className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2">
            <div className="mb-4">
               <p className="text-lg sm:text-xl text-left">Verify Details</p>
               <p className="text-2xl sm:text-3xl font-semibold text-left">
                  Fill In Patient Details
               </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <DefaultInput
                  label="First Name"
                  value={inputs.firstName}
                  placeholder="Enter First Name"
                  name="firstName"
                  handleInputsChange={handleInputsChange}
               />
               <DefaultInput
                  label="Last Name"
                  value={inputs.lastName}
                  placeholder="Enter Last Name"
                  name="lastName"
                  handleInputsChange={handleInputsChange}
               />
               <DefaultInput
                  label="SSN"
                  value={inputs.ssn}
                  placeholder="Enter SSN"
                  name="ssn"
                  handleInputsChange={handleInputsChange}
               />
               <DefaultInput
                  label="Policy Number"
                  value={inputs.policyNumber}
                  placeholder="Enter Policy Number"
                  name="policyNumber"
                  handleInputsChange={handleInputsChange}
               />
               <DefaultInput
                  label="Date of Birth"
                  value={inputs.dob}
                  placeholder="Enter Date of Birth"
                  name="dob"
                  handleInputsChange={handleInputsChange}
               />
            </div>

            <NavigationButtons
               backHref={`/appeal/${appealId}/appealer-details`}
               nextHref={`/appeal/${appealId}/letter-details`}
            />
         </div>
      </div>
   )
}

export default PatientDetailsPage

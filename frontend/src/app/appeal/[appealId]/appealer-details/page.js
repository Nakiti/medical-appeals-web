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
               <p className="text-lg sm:text-xl text-left">First, Your Details</p>
               <p className="text-2xl sm:text-3xl font-semibold text-left">
                  Fill In Appealer Details
               </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <DefaultInput
                  label="First Name"
                  value={inputs.appealerFirstName}
                  placeholder="Enter First Name"
                  name="appealerFirstName"
                  handleInputsChange={handleInputsChange}
               />
               <DefaultInput
                  label="Last Name"
                  value={inputs.appealerLastName}
                  placeholder="Enter Last Name"
                  name="appealerLastName"
                  handleInputsChange={handleInputsChange}
               />
               <DefaultInput
                  label="Address"
                  value={inputs.appealerAddress}
                  placeholder="Enter Address"
                  name="appealerAddress"
                  handleInputsChange={handleInputsChange}
               />
               <DefaultInput
                  label="Email Address"
                  value={inputs.appealerEmailAddress}
                  placeholder="Enter Email Address"
                  name="appealerEmailAddress"
                  handleInputsChange={handleInputsChange}
               />
               <DefaultInput
                  label="Phone Number"
                  value={inputs.appealerPhoneNumber}
                  placeholder="Enter Phone Number"
                  name="appealerPhoneNumber"
                  handleInputsChange={handleInputsChange}
               />
               <DefaultInput
                  label="Relation"
                  value={inputs.appealerRelation}
                  placeholder="Enter Relation"
                  name="appealerRelation"
                  handleInputsChange={handleInputsChange}
               />
            </div>

            <NavigationButtons
               backHref={`/appeal/${appealId}/form-upload`}
               nextHref={`/appeal/${appealId}/patient-details`}
            />
         </div>
      </div>
   )
}

export default PatientDetailsPage

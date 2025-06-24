"use client"
import { useContext } from "react"
import { FormContext } from "@/app/context/formContext"
import FormInput from "../../components/input"
import DetailsForm from "../../components/detailsForm"

const LetterDetailsPage = () => {
   const {inputs, handleInputsChange} = useContext(FormContext)

   const fields = [
      { label: "Insurance Provider", name: "insuranceProvider", placeholder: "Enter Insurance Provider" },
      { label: "Insurance Address", name: "insuranceAddress", placeholder: "Enter Insurance Address" },
      { label: "Physician Name", name: "physicianName", placeholder: "Enter Physician Name" },
      { label: "Physician Phone", name: "physicianPhone", placeholder: "Enter Physician Phone" },
      { label: "Physician Address", name: "physicianAddress", placeholder: "Enter Physician Address" },
      { label: "Physician Email", name: "physicianEmail", placeholder: "Enter Physician Email" },
   ];

   return (
      <DetailsForm
         title="Letter Details"
         subtitle="Information About the Letter"
         fields={fields}
         inputs={inputs}
         handleInputsChange={handleInputsChange}
      />
   );
}

export default LetterDetailsPage
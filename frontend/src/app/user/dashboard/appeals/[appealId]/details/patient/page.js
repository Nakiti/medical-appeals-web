"use client"
import { useContext } from "react"
import { FormContext } from "@/app/context/formContext"
import DetailsForm from "../../components/detailsForm"

const PatientDetailsPage = () => {
   const {inputs, handleInputsChange} = useContext(FormContext)
   const fields = [
      { label: "First Name", name: "firstName", placeholder: "Enter First Name" },
      { label: "Last Name", name: "lastName", placeholder: "Enter Last Name" },
      { label: "Claim Number", name: "claimNumber", placeholder: "Enter Claim Number" },
      { label: "Appeal Deadline", name: "appealDeadline", placeholder: "Enter Appeal Deadline", type: "date" },
      { label: "SSN", name: "ssn", placeholder: "Enter SSN" },
      { label: "Date of Birth", name: "dob", placeholder: "Enter Date of Birth", type: "date" },
      { label: "Policy Number", name: "policyNumber", placeholder: "Enter Policy Number" },
   ];

   return (
      <DetailsForm
         title="Patient Details"
         subtitle="Information About the Patient"
         fields={fields}
         inputs={inputs}
         handleInputsChange={handleInputsChange}
      />
   );

}

export default PatientDetailsPage
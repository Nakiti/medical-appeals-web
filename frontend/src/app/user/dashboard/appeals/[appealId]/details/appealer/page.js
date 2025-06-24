"use client"
import { useContext } from "react"
import { FormContext } from "@/app/context/formContext"
import DetailsForm from "../../components/detailsForm"

const AppealerDetailsPage = () => {
   const {inputs, handleInputsChange} = useContext(FormContext)

   const fields = [
      { label: "First Name", name: "appealerFirstName", placeholder: "Enter First Name" },
      { label: "Last Name", name: "appealerLastName", placeholder: "Enter Last Name" },
      { label: "Address", name: "appealerAddress", placeholder: "Enter Address" },
      { label: "Email Address", name: "appealerEmailAddress", placeholder: "Enter Email Address" },
      { label: "Phone Number", name: "appealerPhoneNumber", placeholder: "Enter Phone Number" },
      { label: "Relation", name: "appealerRelation", placeholder: "Enter Appealer Relation" },
   ];

   return (
      <DetailsForm
         title="Appealer Details"
         subtitle="Information About the Person Creating the Appeal"
         fields={fields}
         inputs={inputs}
         handleInputsChange={handleInputsChange}
      />
   );
}

export default AppealerDetailsPage
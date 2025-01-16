import { createContext } from "react";
import { useState, useEffect, useContext } from "react";
import useFormInput from "../hooks/useFormInput";
import { getAppeal } from "../services/fetchServices";
import { AuthContext } from "./authContext";

export const FormContext = createContext()

export const FormContextProvider = ({children, appealId, userId}) => {
   const [inputs, handleInputsChange, setInputs] = useFormInput({})
   const [documents, setDocuments] = useState([])
   const {currentUser} = useContext(AuthContext)

   useEffect(() => {
      const fetchData = async() => {
         console.log(appealId)
         if (appealId != null) {
            console.log("yo")
            const response = await getAppeal(appealId)
            console.log(response)
            setInputs({
               firstName: response.first_name || "",
               lastName: response.last_name || "",
               claimNumber: response.claim_number || "",
               ssn: response.ssn || "",
               dob: response.dob || "",
               insuranceProvider: response.insurance_provider || "",
               policyNumber: response.policy_number || "",
               procedureName: response.procedure_name || "",
               denialReason: response.denial_reason || "",
               additionalDetails: response.additional_details || "",
               dateFiled: response.date_filed || null,
               submitted: response.submitted || 0,
               status: response.status || "",
            })
            setDocuments(response.supporting_documents || [])
         }
      }

      fetchData()
   }, [])

   return (
      <FormContext.Provider value={{inputs, handleInputsChange, documents, setDocuments, appealId, currentUser}}>
         {children}
      </FormContext.Provider>
   )
}
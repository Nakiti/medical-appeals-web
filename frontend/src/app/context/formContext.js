import { createContext } from "react";
import { useState, useEffect, useContext } from "react";
import useFormInput from "../hooks/useFormInput";
import { getAppeal, getFilesByAppeal } from "../services/fetchServices";
import { AuthContext } from "./authContext";

export const FormContext = createContext()

export const FormContextProvider = ({appealId, children}) => {
   const [inputs, handleInputsChange, setInputs] = useFormInput({
      firstName: "",
      lastName: "",
      claimNumber: "",
      ssn: "",
      dob: "",
      insuranceProvider: "",
      insuranceAddress: "",
      physicianName: "",
      physicianPhone: "",
      physicianAddress: "",
      physicianEmail: "",
      policyNumber: "",
      procedureName: "",
      denialReason: "",
      additionalDetails: "",
      dateFiled: null,
      submitted: 0,
      status: "",
   })
   const [documents, setDocuments] = useState([])
   const [images, setImages] = useState([])

   useEffect(() => {
      console.log("appealId", appealId)

      const fetchData = async() => {
         if (appealId != "new") {
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
               insuranceAddress: response.insurance_address || "",
               physicianName: response.physician_name || "",
               physicianPhone: response.physicial_phone || "",
               physicianAddress: response.physician_address || "",
               physicianEmail: response.physician_email || "",
               policyNumber: response.policy_number || "",
               procedureName: response.procedure_name || "",
               denialReason: response.denial_reason || "",
               additionalDetails: response.additional_details || "",
               dateFiled: response.date_filed || null,
               submitted: response.submitted || 0,
               status: response.status || "",
            })

            const documentsResponse = await getFilesByAppeal(appealId)
            console.log(documentsResponse)
            setDocuments(documentsResponse || [])
         }
      }

      fetchData()
   }, [])

   return (
      <FormContext.Provider value={{inputs, handleInputsChange, setInputs, documents, setDocuments, appealId, images, setImages}}>
         {children}
      </FormContext.Provider>
   )
}
"use client";
import React, { useEffect, useState, use } from 'react';
import { getAppeal, getFilesByAppeal } from '@/app/services/fetchServices';
import ProgressBar from './components/progressBar';
import AppealDetails from './components/appealDetails';
import AppealDocuments from './components/appealDocuments';
import { useRouter } from 'next/navigation';

const AppealScreen = ({ params }) => {
   const [data, setData] = useState(null);
   const [files, setFiles] = useState(null);
   const unwrappedParams = use(params);
   const appealId = unwrappedParams.appealId;
   const [isDraft, setIsDraft] = useState(false)
   const router = useRouter()

   const [inputs, setInputs] = useState({
      firstName: "",
      lastName: "",
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
   })

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await getAppeal(appealId);
            setData(response);
            setIsDraft(response.submitted == 1 ? false : true)
            console.log(isDraft)

            setInputs({
               firstName: response.first_name,
               lastName: response.last_name,
               dob: response.dob,
               insuranceProvider: response.insurance_provider,
               insuranceAddress: response.insurance_address,
               physicianName: response.physician_name,
               physicianPhone: response.physician_phone,
               physicianAddress: response.physician_address,
               physicianEmail: response.physician_email,
               policyNumber: response.policy_number,
               procedureName: response.procedure_name,
               denialReason: response.denial_reason,
               additionalDetails: response.additional_details,
            })

            const filesResponse = await getFilesByAppeal(appealId);
            setFiles(filesResponse);
            console.log("files from appeal ", filesResponse);
         } catch (err) {
            console.log(err);
         }
      };

      fetchData();
   }, [appealId]);

   const handleDetailsEdit = () => {
      router.push(`/appeal/${appealId}/patient-details`)
   }

   const handleDocumentsAdd = () => {
      router.push(`/appeal/${appealId}/form-upload`)
   }

   return (
      <div className="p-8 min-h-screen bg-gray-50">
         {data && (
            <div className="flex flex-col lg:flex-row gap-6">
               <div className="lg:w-3/4 bg-white rounded-lg shadow-sm">
                  <div className="px-6 pt-6 pb-4 border-b border-gray-200">
                     <h2 className="text-2xl font-semibold text-gray-800">Your Appeal</h2>

                  </div>
                  {!isDraft && (
                     <div className="mt-4">
                        <ProgressBar currentStatus={"Submitted"} />
                     </div>
                  )}

                  <AppealDetails inputs={inputs} isDraft={isDraft} handleDetailsEdit={handleDetailsEdit}/>
               </div>


               <AppealDocuments files={files} isDraft={isDraft} handleDocumentsAdd={handleDocumentsAdd}/>
            </div>
         )}
      </div>
   );
};

export default AppealScreen;

"use client";
import React, { useEffect, useState, use } from 'react';
import { getAppeal, getAppealLetter, getFilesByAppeal } from '@/app/services/fetchServices';
import ProgressBar from './components/progressBar';
import AppealDetails from './components/appealDetails';
import AppealDocuments from './components/appealDocuments';
import { useRouter } from 'next/navigation';
import { IoDocumentTextOutline } from "react-icons/io5";
import LoadingSpinner from '@/app/components/loadingSpinner';

const AppealScreen = ({ params }) => {
   const [data, setData] = useState(null);
   const [files, setFiles] = useState(null);
   const [appealLetter, setAppealLetter] = useState(null)
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
            
            const appealLetterResponse = await getAppealLetter(appealId)
            setAppealLetter(appealLetterResponse)
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

   if (!data) {
      return <LoadingSpinner />;
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
                  {appealLetter && 
                     <div className="flex flex-row items-center space-x-2 px-6 py-6">
                        <p className="text-base font-semibold text-gray-700 text-lg">Appeal Letter:</p>
                        <button
                           className="cursor-pointer w-full sm:w-1/2 flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md transition duration-200"
                           onClick={() => {
                              window.open(appealLetter.blob_url, "_blank");
                           }}
                        >
                           <IoDocumentTextOutline size={24} className="text-blue-600" />
                           <span className="text-sm font-medium text-gray-800">View Appeal Letter</span>
                        </button>
                     </div>
                  }

                  <AppealDetails inputs={inputs} isDraft={isDraft} handleDetailsEdit={handleDetailsEdit}/>
               </div>


               <AppealDocuments files={files} isDraft={isDraft} handleDocumentsAdd={handleDocumentsAdd}/>
            </div>
         )}
      </div>
   );
};

export default AppealScreen;

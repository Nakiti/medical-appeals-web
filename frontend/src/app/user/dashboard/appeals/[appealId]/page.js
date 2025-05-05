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
      <div className="p-4 sm:p-8 min-h-screen bg-gradient-to-b from-white via-indigo-50 to-slate-100">
        {data && (
          <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
            {/* Left Column */}
            <div className="lg:w-3/4 bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800">Your Appeal</h2>
                {!isDraft && (
                  <div className="mt-4">
                    <ProgressBar currentStatus="Submitted" />
                  </div>
                )}
              </div>
    
              {/* Appeal Letter */}
              {appealLetter && (
                <div className="px-6 py-5 border-b border-gray-100">
                  <p className="text-lg font-semibold text-gray-700 mb-3">Appeal Letter:</p>
                  <button
                    className="flex items-center gap-3 px-4 py-2 rounded-lg border border-indigo-300 bg-white hover:bg-indigo-50 text-indigo-700 transition font-medium text-sm"
                    onClick={() => window.open(appealLetter.blob_url, "_blank")}
                  >
                    <IoDocumentTextOutline size={22} className="text-indigo-600" />
                    View Appeal Letter
                  </button>
                </div>
              )}
    
              {/* Details */}
              <AppealDetails inputs={inputs} isDraft={isDraft} handleDetailsEdit={handleDetailsEdit} />
            </div>
    
            {/* Right Column */}
            <AppealDocuments
              files={files}
              isDraft={isDraft}
              handleDocumentsAdd={handleDocumentsAdd}
            />
          </div>
        )}
      </div>
    );
    
};

export default AppealScreen;

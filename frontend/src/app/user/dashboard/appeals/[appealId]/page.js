"use client";
import React, { useEffect, useState, use } from 'react';
import { getAppeal, getAppealLetter, getFilesByAppeal } from '@/app/services/fetchServices';
import ProgressBar from './components/progressBar';
import AppealDetails from './components/appealDetails';
import AppealDocuments from './components/appealDocuments';
import { useRouter } from 'next/navigation';
import { IoDocumentTextOutline } from "react-icons/io5";
import LoadingSpinner from '@/app/components/loadingSpinner';
import { FiEdit } from 'react-icons/fi';
import { FaSave } from 'react-icons/fa';
import { FiRefreshCcw } from "react-icons/fi";
import Research from './components/research';
import { updateAppeal, updateFile } from '@/app/services/updateServices';
import { createAppealLetter, createFile } from '@/app/services/createServices';
import { writeAppealLetter } from '@/app/services/gptServices';

const AppealScreen = ({ params }) => {
   const [data, setData] = useState(null);
   const [files, setFiles] = useState(null);
   const [appealLetter, setAppealLetter] = useState(null)
   const unwrappedParams = use(params);
   const appealId = unwrappedParams.appealId;
   const [isDraft, setIsDraft] = useState(false)
   const router = useRouter()
   const [dropdown, setDropdown] = useState("details")

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
      appealerAddress: "",
      appealerFirstName: "",
      appealerLastName: "",
      appealerRelation: "",
      appealerPhoneNumber: "",
   })

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await getAppeal(appealId);
            setData(response);
            setIsDraft(response.submitted == 1 ? false : true)
            const appealLetter = await getAppealLetter(appealId)
            console.log(isDraft)
            console.log(response)
            console.log("appeal", appealLetter)

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
               appealerAddress: response.appealer_address,
               appealerFirstName: response.appealer_first_name,
               appealerLastName: response.appealer_last_name,
               appealerRelation: response.appealer_relation,
               appealerPhoneNumber: response.appealer_phone_number,
            })

            const filesResponse = await getFilesByAppeal(appealId);
            setFiles(filesResponse);
            
            const appealLetterResponse = await getAppealLetter(appealId)
            console.log("appeal letter", appealLetterResponse)
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

   const handleDropdownChange = (e) => {
      setDropdown(e.target.value)
   }

   const handleSave = async() => {
      await updateAppeal(appealId, inputs, [])
   }

   const handleGenarate = async() => {
      const {file, url} = await writeAppealLetter(inputs)
      console.log(url)
      setAppealLetter(url)

      const appealLetterId = await updateFile({appealId: appealId, fileName: "appeal-letter", fileType: "application/pdf"}, file)
      await createAppealLetter(appealLetterId, appealId)
   }

   if (!data) {
      return <LoadingSpinner />;
   }

   return (
      <div className="p-4 min-h-screen bg-gradient-to-b from-white via-indigo-50 to-slate-100">
         {data && 
            <div className="flex flex-col lg:flex-row gap-4 max-w-7xl mx-auto">
            {/* Left: Appeal Details */}
            <div className="lg:w-1/2 bg-white rounded-xl shadow-sm overflow-hidden">
               <div className="px-4 pt-4">
               {/* Top Row: Title and Buttons */}
               <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Manage Appeal</h2>

                  <div className="flex gap-3">
                     {/* Generate Button */}
                     <button
                        className="flex items-center gap-1 px-4 py-1.5 text-xs font-medium rounded-full border bg-gradient-to-r from-green-400 to-blue-500 text-white"
                        onClick={handleGenarate}
                     >
                     <p>Generate</p>
                     <FiRefreshCcw size={16} />
                     </button>

                     {/* Save Button */}
                     <button
                     className="flex items-center gap-1 px-4 py-1.5 text-xs font-medium rounded-full border bg-gradient-to-r from-slate-400 to-indigo-500 text-white"
                     >
                     <p>Save</p>
                     <FaSave size={16} />
                     </button>
                  </div>
               </div>

               {/* Dropdown Below Everything */}
               <div className="">
                  <select
                     className="w-48 px-2 py-2 text-sm border border-gray-300 rounded-md mt-2 bg-transparent focus:outline-none focus:border-indigo-500 text-gray-700"
                     value={dropdown}
                     onChange={handleDropdownChange}
                  >
                     <option value="details">Appeal Details</option>
                     <option value="research">Research</option>
                  </select>
               </div>
               </div>

               {dropdown == "details" ?                
                  <AppealDetails
                     rawData={inputs}
                     isDraft={isDraft}
                     isEditing={true}
                     onChange={(key, value) =>
                     setInputs((prev) => ({ ...prev, [key]: value }))
                     }
                  />
                  : <Research />
               }
            </div>

            {/* Right: Appeal Letter Viewer */}
            <div className="lg:w-1/2 bg-white rounded-xl shadow-sm min-h-[300px] flex items-center justify-center">
               {appealLetter?.blob_url ? (
                  <iframe
                  src={appealLetter.blob_url}
                  title="Appeal Letter"
                  className="w-full h-full border rounded-md"
                  />
               ) : (
                  <p className="text-gray-500 text-center text-sm">
                  No appeal letter yet. Click <span className="font-semibold">Generate</span> to create one.
                  </p>
               )}
            </div>
            </div>}
      </div>
    );
    
};

export default AppealScreen;

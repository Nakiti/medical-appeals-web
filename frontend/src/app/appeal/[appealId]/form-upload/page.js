"use client"
import Link from "next/link";
import { FaCamera, FaUpload, FaPencilAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useRef, useContext, useState } from "react";
import { FormContext } from "@/app/context/formContext";
import DocumentDisplay from "../../components/documentDisplay";
import { extractAppealDetails } from "@/app/services/gptServices";

const FormUploadPage = () => {
   const router = useRouter();
   const fileInputRef = useRef(null);
   const { documents, setDocuments, inputs, appealId, setInputs } = useContext(FormContext);
   const [loading, setLoading] = useState(false)

   const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      if (file) {
         setDocuments(prev => [...prev, { id: Date.now(), file }]);
      }
   };

   const handleUploadClick = () => {
      fileInputRef.current.click();
   };

   const handleManualEntry = () => {
      router.push(`/appeal/${appealId}/appealer-details`)
   }

   const handleNext = async() => {
      if (documents.length > 0) {
         try {
            setLoading(true)
            const response = await extractAppealDetails(documents)
            setInputs({
               ...inputs, 
               ...response
            })
            
         } catch (err) {
            console.log(err)
         } finally {
            router.push(`/appeal/${appealId}/appealer-details`)
            // setLoading(false)
         }
      } else {
         router.push(`/appeal/${appealId}/appealer-details`)
      }

   }

   const handleRemove = (id) => {
      setDocuments(documents.filter(item => item.id !== id));
   };

   if (loading) {
      return (
         <div className="flex flex-col items-center justify-center h-screen text-center px-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Parsing documents...</h2>
         </div>
      );
   }

   return (
      <div className="w-full flex items-center justify-center px-4 py-4">
         <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
            <div className="mb-16">
               <p className="text-lg sm:text-xl text-left">Onto the Next Step!</p>
               <p className="text-2xl sm:text-3xl font-semibold text-left">
                  Upload any forms/letters relevant to the appeal
               </p>
            </div>

            <div className="space-y-2">
               {/* Upload Button */}
               {/* <Link
                  className="bg-white border border-blue-500 w-full rounded-lg h-32 sm:h-36 p-4 sm:p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300"
                  href={`/user/appeal/edit/capture/camera`}
               >
                  <FaCamera className="text-3xl sm:text-4xl text-gray-500" />
                  <p className="text-gray-500 font-semibold mt-3 sm:mt-4 text-sm sm:text-base">Take a Picture</p>
               </Link> */}
               <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
               />

               <button
                  className="flex items-center justify-center w-full rounded-full p-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm sm:text-base"
                  onClick={handleUploadClick}
               >
                  <FaUpload className="text-md" />
                  <span className="ml-3">Upload Files</span>
               </button>
               {/* Divider */}
               <div className="flex items-center justify-center w-full">
                  <div className="flex-grow h-px bg-gray-300"></div>
                  <span className="px-3 text-gray-500 font-semibold text-sm">or</span>
                  <div className="flex-grow h-px bg-gray-300"></div>
               </div>

               {/* File Upload */}

               <button
                  className="flex items-center justify-center w-full rounded-full p-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold text-sm sm:text-base"
                  onClick={handleManualEntry}
               >
                  <FaPencilAlt className="text-md" />
                  <span className="ml-3">Enter Details Manually</span>
               </button>

               {/* Uploaded Files */}
               {documents && documents.map((item, index) => (
                  <DocumentDisplay item={item} key={index} />
               ))}
            </div>

            {/* Next Button */}
            <button
               onClick={handleNext}
               className="w-full mt-16 flex-1 text-center rounded-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold text-base hover:opacity-90 transition duration-200 shadow-md"
            >
               Next
            </button>
         </div>
      </div>
   );
};

export default FormUploadPage;

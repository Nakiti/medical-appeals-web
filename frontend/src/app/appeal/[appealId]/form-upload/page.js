"use client"
import Link from "next/link";
import { FaCamera, FaUpload, FaPencilAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useRef, useContext } from "react";
import { FormContext } from "@/app/context/formContext";
import DocumentDisplay from "../../components/documentDisplay";

const FormUploadPage = () => {
   const router = useRouter()
   const fileInputRef = useRef(null);
   const {documents, setDocuments, inputs, appealId} = useContext(FormContext)
   console.log(inputs)

   const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      console.log(file)
      setDocuments(prev => [...prev, {id: Date.now(), file: file}]);
      if (file) {
         // You can add any additional logic here if needed
      }
      console.log("document upload ",documents)
   };

   const handleUploadClick = () => {
      fileInputRef.current.click();
   };
   

   const handleClick = async() => {
      router.push(`/appeal/${appealId}/patient-details`)
   }

   const handleRemove = (id) => {
      setDocuments(documents.filter(item => item.id != id))
   }

   return (
      <div className="w-full flex items-center justify-center py-8">
         <div className="w-1/3 mx-auto">
            <div className="mb-4">
               <p className="text-xl text-left">Onto the Next Step!</p>
               <p className="text-3xl font-semibold text-left">
                  Upload any forms/letters relevant to the appeal
               </p>
            </div>
            <div className="space-y-2">


               {/* Upload Button */}
               <Link
                  className="bg-white border border-blue-500 w-full mx-auto rounded-lg h-36 p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300"
                  href={`/user/appeal/edit/capture/camera`}
               >
                  <FaCamera className="text-4xl text-gray-500" />
                  <p className="text-gray-500 font-semibold mt-4">Take a Picture</p>
               </Link>

               <div className="flex items-center justify-center w-full">
                  <div className="flex-grow h-px bg-gray-300"></div>
                  <span className="px-3 text-gray-500 font-semibold">or</span>
                  <div className="flex-grow h-px bg-gray-300"></div>
               </div>

               {/* File Upload Input */}
               <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
               />

               <button
                  className="flex items-center justify-center w-full mx-auto rounded-full p-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold "
                  onClick={handleUploadClick}
               >
                  <FaUpload className="text-xl" />
                  <span className="ml-3 text-sm">Upload Files</span>
               </button>
               {
                  documents && documents.map((item, index) => {
                     return (
                        <DocumentDisplay item={item} key={index}/>
                     );
                  })
                  }

               {/* <Link
                  className="flex items-center justify-center w-full mx-auto rounded-full p-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                  href={`/user/appeal/edit//form/patient-details`}
               >
                  <FaPencilAlt className="text-xl" />
                  <span className="ml-3 text-sm">Enter Details Manually</span>
               </Link> */}
               </div>

               {/* Next Button */}
               <button onClick={handleClick} className="w-full mt-8 rounded-full py-4 bg-blue-800 text-white font-bold text-lg hover:bg-blue-900 transition duration-200">
                  Next
               </button>
         </div>
      </div>
   );
};

export default FormUploadPage;

"use client";
import React, { useContext, useRef, useState } from 'react';
import { FaImage, FaPencilAlt, FaCamera, FaUpload } from 'react-icons/fa';
import { FormContext } from '@/app/context/formContext';
import { extractAppealDetails } from '@/app/services/gptServices';
import Link from 'next/link';
import { FaFileAlt } from "react-icons/fa";
import { IoClose } from 'react-icons/io5';
import FileDisplay from './components/file';

const InitialScreen = () => {
   const { inputs, handleInputsChange, documents, setDocuments, appealId, images } = useContext(FormContext);
   const fileInputRef = useRef(null);

   const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      setDocuments(prev => [...prev, {id: Date.now(), file: file}]);
      if (file) {
         // You can add any additional logic here if needed
      }
      console.log(documents)
   };

   const handleUploadClick = () => {
      fileInputRef.current.click();
   };

   return (
      <div className="flex flex-col min-h-screen relative">
         {/* Loading overlay */}
         <div className="flex flex-col px-6 py-4 flex-grow">
            <h1 className="text-2xl text-center font-semibold">Upload a File of Your Forms</h1>
            <p className="text-md mt-2 text-center">
               Upload an image or file to extract the details and automatically fill them into the form fields.
            </p>
            <Link
               className="bg-gray-200 border border-blue-500 w-5/6 md:w-1/2 mx-auto rounded-lg p-6 sm:p-8 flex flex-col items-center mt-8 sm:mt-10 cursor-pointer"
               href={`/user/appeal/edit/${appealId}/capture/camera`}
            >
               <FaCamera className="text-4xl text-gray-500" />
               <p className="text-gray-500 font-semibold mt-4">Take a Picture</p>
            </Link>

            <div className="flex items-center justify-center w-4/5 sm:w-3/4 my-8 mx-auto">
               <div className="flex-grow h-px bg-gray-300"></div>
               <span className="px-3 text-gray-500 font-semibold">or</span>
               <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <input
               type="file"
               ref={fileInputRef}
               style={{ display: 'none' }}
               onChange={handleFileUpload}
            />
            <button
               className="flex mb-6 w-5/6 md:w-1/2 mx-auto items-center justify-center bg-blue-500 rounded-full p-3 cursor-pointer opacity-70"
               onClick={handleUploadClick}
            >
               <FaUpload className="text-white text-xl" />
               <p className="text-white text-sm font-semibold ml-3">Upload Files</p>
            </button>
            <Link
               className="flex w-5/6 md:w-1/2 mx-auto items-center justify-center bg-blue-500 rounded-full p-3 cursor-pointer opacity-70"
               href={`/user/appeal/edit/${appealId}/form/patient-details`}
            >
               <FaPencilAlt className="text-white text-xl" />
               <p className="text-white text-sm font-semibold ml-3">Enter Details Manually</p>
            </Link>

            <div className="space-y-2 mb-12 mt-8">
            {documents.map((document, index) => {
               console.log(document)
               const isImage = document.src?.startsWith("data:image/");
               const blobUrl = document.blob_url || (document instanceof File ? URL.createObjectURL(document) : null);
               console.log(blobUrl)
               return (
                  <FileDisplay document={document} isImage={isImage} key={index} blobUrl={blobUrl} setDocuments={setDocuments} index={index}/>
               );
            })}

            </div>
         </div>
      </div>
   );
};

export default InitialScreen;

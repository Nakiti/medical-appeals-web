"use client"
import React, { useState, useContext, useRef } from 'react';
import { FormContext } from '@/app/context/formContext';
import FileDisplay from '../initial/components/file';
import { FaUpload } from 'react-icons/fa';

const SupportingDocuments = ({ navigation }) => {
   const {documents, setDocuments} = useContext(FormContext)
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
      <div className="flex flex-col min-h-screen">
         <div className="flex-col px-5 max-w-4xl w-full mx-auto">
            <h1 className="text-2xl text-center font-bold mb-2">Supporting Documents</h1>
            <p className="text-md text-center text-gray-600 mb-6">
               Upload files or images as required for your submission. You can preview your uploads below.
            </p>

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

            <div className="space-y-4">
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

export default SupportingDocuments;

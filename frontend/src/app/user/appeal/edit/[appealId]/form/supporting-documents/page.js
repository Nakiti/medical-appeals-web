"use client"
import React, { useState, useContext } from 'react';
import { FormContext } from '@/app/context/formContext';

const SupportingDocuments = ({ navigation }) => {
   const {documents, setDocuments} = useContext(FormContext)


   const handleFileSelection = async () => {
      try {
         const result = await window.showOpenFilePicker({
            types: [{ description: 'PDF files', accept: { 'application/pdf': ['.pdf'] } }],
            multiple: true,
         });

         const files = await Promise.all(result.map(async (fileHandle) => {
            const file = await fileHandle.getFile();
            return {
               uri: URL.createObjectURL(file),
               name: file.name,
            };
         }));

         setDocuments([...documents, ...files]);
      } catch (err) {
         console.error(err);
      }
   };

   const handleUpload = async () => {
      try {
         const [fileHandle] = await window.showOpenFilePicker({
            multiple: false,
         });
         const file = await fileHandle.getFile();
         setDocuments([...documents, {
            uri: URL.createObjectURL(file),
            name: file.name,
         }]);
      } catch (err) {
         console.error(err);
      }
   };

   return (
      <div className="flex flex-col min-h-screen">
         <div className="flex-col px-5 max-w-4xl w-full mx-auto">
            <h1 className="text-2xl text-center font-bold mb-2">Supporting Documents</h1>
            <p className="text-md text-center text-gray-600 mb-6">
               Upload files or images as required for your submission. You can preview your uploads below.
            </p>

            <button
               className="bg-blue-500 text-white py-3 px-6 rounded-lg mb-6"
               onClick={handleFileSelection}
            >
               Upload Document
            </button>

            <div className="space-y-4">
               {documents.map((item, index) => (
                  <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                     <img src={item.uri} alt={item.name} className="w-8 h-8 rounded-lg mr-4" />
                     <span className="text-sm text-gray-800">{item.name || 'File'}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default SupportingDocuments;

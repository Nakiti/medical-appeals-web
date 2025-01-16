"use client";
import React, { useContext, useRef } from 'react';
import { FaImage, FaPencilAlt } from 'react-icons/fa';
import { FormContext } from '@/app/context/formContext';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';


pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"

const InitialScreen = () => {
   const { inputs, handleInputsChange } = useContext(FormContext);
   const fileInputRef = useRef(null);

   const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      if (file) {
         console.log("File uploaded:", file);
         const arrBuff = await file.arrayBuffer()
         await getTextFromPdf(arrBuff)
      }
   };

   const getTextFromPdf = async (array) => {
      try {
         const pdf = await pdfjsLib.getDocument({data: array}).promise
         console.log(pdf)
         let fullText = '';

         for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n';
         }
   
         console.log('Extracted Text:', fullText);
      } catch (err) {
         console.log(err)
      }
   } 

   const handleUploadClick = () => {
      fileInputRef.current.click();
   };

   return (
      <div className="flex flex-col min-h-screen">
         <div className="flex flex-col px-6 py-4 flex-grow">
            <h1 className="text-2xl text-center font-semibold">Upload a File of Your Forms</h1>
            <p className="text-md mt-2 text-center">
               Upload an image or file to extract the details and automatically fill them into the form fields.
            </p>

            <div 
               className="bg-gray-200 border border-blue-500 w-3/4 sm:w-2/3 md:w-1/2 mx-auto rounded-lg p-6 sm:p-8 flex flex-col items-center mt-8 sm:mt-10 cursor-pointer"
               onClick={handleUploadClick}
            >
               <FaImage className="text-4xl text-gray-500" />
               <p className="text-gray-500 font-semibold mt-4">Upload File</p>
            </div>

            <input
               type="file"
               ref={fileInputRef}
               style={{ display: 'none' }}
               onChange={handleFileUpload}
            />

            <div className="w-4/5 sm:w-3/4 h-px bg-gray-300 my-8 mx-auto"></div>

            <div className="flex w-3/4 sm:w-1/2 mx-auto items-center justify-center bg-blue-500 rounded-full p-3 cursor-pointer opacity-70">
               <FaPencilAlt className="text-white text-xl" />
               <p className="text-white text-sm font-semibold ml-3">Enter Details Manually</p>
            </div>
         </div>
      </div>
   );
};

export default InitialScreen;

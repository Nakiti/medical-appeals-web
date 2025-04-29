"use client";
import React, { useState, useContext } from "react";
import { FormContext } from "@/app/context/formContext";

const ReviewPage = () => {
   const [showSubmitDialog, setShowSubmitDialog] = useState(false);
   const {appealLetter} = useContext(FormContext)

   const handleSave = () => {
      
   }

   return (
      <div className="max-w-4xl mx-auto px-4 py-8">
         {/* Title */}
         <h1 className="text-3xl font-bold mb-6 text-gray-800">Review Your Claim</h1>

         {/* PDF Viewer Placeholder */}
         {appealLetter ? (
            <iframe
               src={appealLetter}
               className="w-full h-[600px] border border-gray-300 rounded-lg mb-6"
            />
         ) : (
            <div className="w-full h-[600px] bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center mb-6">
               <p className="text-gray-500">PDF document preview will appear here</p>
            </div>
         )}

         <div className="flex flex-col gap-4 w-3/4 mx-auto mt-8">
            <button 
               className="w-full rounded-full py-3 sm:py-4 bg-indigo-600 text-white font-semibold text-base sm:text-lg hover:bg-indigo-700 transition duration-200"
               onClick={() => setShowSubmitDialog(true)}
            >
               Submit
            </button>

            <button 
               className="w-full rounded-full py-3 sm:py-4 bg-gray-200 text-gray-800 font-semibold text-base sm:text-lg hover:bg-gray-300 transition duration-200"
            >
               Save & Exit
            </button>

            <button 
               className="w-full rounded-full py-3 sm:py-4 bg-white border border-gray-300 text-gray-700 font-semibold text-base sm:text-lg hover:bg-gray-100 transition duration-200"
            >
               Edit
            </button>
         </div>

         {showSubmitDialog && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
               <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900">
                     Confirm Submission
                  </h2>
                  <p className="mb-6 text-gray-700">
                     Are you sure you want to submit your claim? You won’t be able to make changes after submitting.
                  </p>
                  <div className="flex justify-end gap-4">
                     <button
                        onClick={() => setShowSubmitDialog(false)}
                        className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                     >
                        Cancel
                     </button>
                     <button
                        onClick={() => {
                           // Submit logic here
                           setShowSubmitDialog(false);
                        }}
                        className="px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
                     >
                        Confirm & Submit
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default ReviewPage;

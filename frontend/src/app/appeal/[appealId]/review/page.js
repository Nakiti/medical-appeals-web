"use client";
import React, { useState, useContext } from "react";
import { FormContext } from "@/app/context/formContext";
import { useRouter } from "next/navigation";
import { createAppealLetter, createFile } from "@/app/services/createServices";
import { AuthContext } from "@/app/context/authContext";

const ReviewPage = () => {
   const [showSubmitDialog, setShowSubmitDialog] = useState(false);
   const {appealLetter, appealId, inputs, appealLetterUrl } = useContext(FormContext)
   const {currentUser} = useContext(AuthContext)
   const router = useRouter()

   const handleSave = async() => {
      const appealData = {
         userId: currentUser,
         ...inputs,
         // dateFiled: new Date().toISOString().slice(0, 19).replace("T", " "),
         submitted: 0,
         status: "Ready to Submit",
      };

      await processAppeal(appealData)
   }

   const handleSubmit = async() => {
      const appealData = {
         userId: currentUser,
         ...inputs,
         dateFiled: new Date().toISOString().slice(0, 19).replace("T", " "),
         submitted: 1,
         status: "Submitted",
      };

      await processAppeal(appealData)
      setShowSubmitDialog(false);
   }

   const processAppeal = async (appealData) => {
      try {
         if (appealId !== "new") {
            await updateAppeal(appealId, appealData, documents);
            await createBatchFiles(appealId, documents.map(item => item.file));
         } else {
            const newAppealId = await createAppeal(appealData, documents);
            await createBatchFiles(newAppealId, documents.map(item => item.file));

            const appealLetterId = await createFile({appealId: appealId, fileName: "appeal-letter", fileType: "application/pdf", appealLetter})
            await createAppealLetter(appealLetterId, appealId)
         }
      } catch (err) {
         console.log(err)
      } finally {
         router.push("/user/dashboard/home")
      }
   }

   const handleEdit = () => {
      router.push(`/appeal/${appealId}/patient-details`)
   }

   return (
      <div className="max-w-4xl mx-auto px-4 py-8">
         <h1 className="text-3xl font-bold mb-6 text-gray-800">Review Your Claim</h1>

         {appealLetter ? (
            <iframe
               src={appealLetterUrl}
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
               onClick={handleSave}
            >
               Save & Exit
            </button>

            <button 
               className="w-full rounded-full py-3 sm:py-4 bg-white border border-gray-300 text-gray-700 font-semibold text-base sm:text-lg hover:bg-gray-100 transition duration-200"
               onClick={handleEdit}
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
                        onClick={handleSubmit}
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

"use client";
import { FiRefreshCcw } from "react-icons/fi";
import { useContext, useEffect, useRef, useState } from "react";
import { FormContext } from "@/app/context/formContext";
import { updateFile } from "@/app/services/updateServices";
import { writeAppealLetter } from "@/app/services/gptServices";
import { createAppealLetter, createFile } from "@/app/services/createServices";

const LetterPage = () => {
   const { appealLetterUrl, appealId, inputs, appealLetter, status, documents, setAppealLetter, setAppealLetterUrl } = useContext(FormContext);
   const [loading, setLoading] = useState(false);
   const [hasChanged, setHasChanged] = useState(false);

   // Store last used inputs to generate the letter
   const lastUsedInputsRef = useRef(null);

   // Compare current inputs to the last-used ones
   useEffect(() => {
      if (!lastUsedInputsRef.current) {
         setHasChanged(true); // first load
      } else {
         const current = JSON.stringify(inputs);
         const previous = JSON.stringify(lastUsedInputsRef.current);
         setHasChanged(current !== previous);
      }
   }, [inputs]);

   const handleRegenerate = async () => {

      setLoading(true);
      try {
         const docs = await Promise.all(
            documents.map(async (item) => {
               const response = await fetch(item.blob_url);
               const blob = await response.blob();

               return new File([blob], item.file_name || item.name || 'document.pdf', {
                  type: blob.type,
                  lastModified: Date.now()
               });
            })
         );

         if (appealLetter) {
            const newAppealLetter = await writeAppealLetter(inputs, docs);
            await updateFile(
               appealLetter.file_id,
               { appealId, fileName: "appeal-letter", fileType: "application/pdf" },
               newAppealLetter.file
            );
            lastUsedInputsRef.current = { ...inputs }; // store latest
         } else  {
            const {file, url} = await writeAppealLetter(inputs)
            setAppealLetter(file)
            setAppealLetterUrl(url)
            console.log(file)
            const appealLetterId = await createFile({appealId: appealId, fileName: "appeal-letter", fileType: "application/pdf"}, file)
            await createAppealLetter(appealLetterId, appealId)
         }
      } catch (err) {
         console.error("Error regenerating letter:", err);
      }
      setLoading(false);
   };

   return (
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 p-10">
         <div className="max-w-6xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden">
         {/* Header */}
         <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h1 className="text-2xl font-light text-gray-800">Appeal Letter</h1>
            {status === "draft" && (
               <button
               onClick={handleRegenerate}
               disabled={loading || !hasChanged}
               className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white transition ${
                  loading || !hasChanged
                     ? "bg-indigo-300 cursor-not-allowed"
                     : "bg-gradient-to-r from-indigo-500 to-blue-500 hover:opacity-90"
               }`}
               >
               <FiRefreshCcw size={16} className={loading ? "animate-spin" : ""} />
               {loading ? "Generating..." : "Regenerate"}
               </button>
            )}
         </div>

         {/* Content */}
         <div className="h-[80vh] w-full">
            {appealLetterUrl && !loading ? (
               <iframe src={appealLetterUrl} title="Appeal Letter" className="w-full h-full" />
            ) : loading ? (
               <div className="flex items-center justify-center h-full bg-slate-50 text-slate-500 text-center px-4">
               <p className="text-md">Generating appeal letter...</p>
               </div>
            ) : (
               <div className="flex items-center justify-center h-full bg-slate-50 text-slate-500 text-center px-4">
               <p className="text-md">
                  No letter available yet. Click <strong>Regenerate</strong> to create one.
               </p>
               </div>
            )}
         </div>
         </div>
      </div>
   );
};

export default LetterPage;

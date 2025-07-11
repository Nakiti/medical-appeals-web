"use client";
import { FiRefreshCcw } from "react-icons/fi";
import { useContext, useEffect, useRef, useState } from "react";
import { FormContext } from "@/app/context/formContext";
import { updateFile } from "@/app/services/updateServices";
import { getUsageStats, writeAppealLetter } from "@/app/services/gptServices";
import { createAppealLetter, createFile } from "@/app/services/createServices";

const LetterPage = () => {
   const { appealLetterUrl, appealId, inputs, appealLetter, status, documents, setAppealLetter, setAppealLetterUrl } = useContext(FormContext);
   const [loading, setLoading] = useState(false);
   const [hasChanged, setHasChanged] = useState(false);
   const [writeUsage, setWriteUsage] = useState(null)
   const [disabled, setDisabled] = useState(false)
   const [errorMessage, setErrorMessage] = useState("")

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

      const fetchData = async() => {
         const response = await getUsageStats()
         setWriteUsage(response.letter)
         if (response.letter.remaining == 0) {
            setDisabled(true)
            setErrorMessage(`You have exceeded your daily limit of parse requests. Resets at ${response.letter.resetsAt && new Date(response.letter.resetsAt).toLocaleString("en-US")}`)
         }
      }

      fetchData()
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
            console.log("appeal letter", appealLetter)
            const {file, url, usage} = await writeAppealLetter(inputs, docs);
            await updateFile(
               appealLetter.file_id,
               { appealId, fileName: "appeal-letter", fileType: "application/pdf" },
               file
            );
            lastUsedInputsRef.current = { ...inputs }; // store latest
            setAppealLetter({appealId: appealId, blob_url: url, file_id: appealLetter.file_id})
            setAppealLetterUrl(url)
            setWriteUsage(usage)
            console.log(usage)
            console.log("write usage", writeUsage)
         } else  {
            const {file, url, usage} = await writeAppealLetter(inputs)
            setAppealLetter(file)
            setAppealLetterUrl(url)
            setWriteUsage(usage)
            console.log(usage)
            console.log("write usage", writeUsage)
            const appealLetterId = await createFile({appealId: appealId, fileName: "appeal-letter", fileType: "application/pdf"}, file)
            await createAppealLetter(appealLetterId, appealId)
         }
      } catch (err) {
         console.error("Error regenerating letter:", err);
         setDisabled(true)
         setErrorMessage(`${err.error}. Resets at ${new Date(err.usage.resetsAt).toLocaleString("en-US")}`)
      }
      setLoading(false);
   };

   return (
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 p-10">
         <div className="max-w-6xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden">
         {/* Header */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-5 border-b border-slate-200 bg-white shadow-sm">
            <div>
               <h1 className="text-2xl font-semibold text-slate-800">Appeal Letter</h1>
               <p className="text-sm text-slate-600 mt-1">
                  Generate a letter using all the documents, details, and notes you have inputted!
               </p>
            </div>

            {status === "draft" && (
               <div className="flex flex-col items-end">
                  <button
                     onClick={handleRegenerate}
                     disabled={loading || !hasChanged}
                     className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition ${
                        loading || !hasChanged
                           ? "bg-indigo-300 cursor-not-allowed"
                           : "bg-gradient-to-r from-indigo-500 to-blue-500 hover:opacity-90"
                     }`}
                  >
                     <FiRefreshCcw size={16} className={loading ? "animate-spin" : ""} />
                     {loading ? "Generating..." : "Regenerate"}
                  </button>

                  {writeUsage && (
                     <p className="text-xs text-slate-500 mt-2">
                        Generates Left: <span className="font-semibold text-slate-700">{writeUsage.remaining}</span> / {writeUsage.limit}
                     </p>
                  )}

                  {disabled && (
                     <p className="text-xs mt-1 text-red-600">{errorMessage}</p>
                  )}
               </div>
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

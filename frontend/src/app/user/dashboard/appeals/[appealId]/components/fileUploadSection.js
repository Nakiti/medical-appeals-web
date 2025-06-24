"use client";
import { useRef, useState, useContext } from "react";
import { FiUploadCloud, FiTrash, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FormContext } from "@/app/context/formContext";
import { deleteFiles } from "@/app/services/deleteServices";
import { extractAppealDetails } from "@/app/services/gptServices";
import { createBatchFiles } from "@/app/services/createServices";

const FileUploadSection = () => {
   const fileInputRef = useRef();
   const { documents, setDocuments, inputs, setInputs, appealId } = useContext(FormContext);
   const [isParsing, setIsParsing] = useState(false);
   const [hasUnparsedFiles, setHasUnparsedFiles] = useState(false);
   const [isExpanded, setIsExpanded] = useState(true);
   const maxFiles = 3;

   const handleFileChange = async (e) => {
      const fileObjects = Array.from(e.target.files);
      if (documents.length + fileObjects.length > maxFiles) return;

      setHasUnparsedFiles(true);
      const newDoc = await createBatchFiles(appealId, fileObjects);
      setDocuments(prev => [...newDoc, ...prev]);
   };

   const handleRemove = async (index) => {
      const fileToRemove = documents[index];
      if (!fileToRemove?.id) {
         setDocuments(prev => prev.filter((_, i) => i !== index));
         setHasUnparsedFiles(true);
         return;
      }
      await deleteFiles([fileToRemove.id]);
      setDocuments(prev => prev.filter((_, i) => i !== index));
      setHasUnparsedFiles(true);
   };

   const handleParse = async () => {
      setIsParsing(true);
      try {
         const response = await extractAppealDetails(documents);
         setInputs(prev => ({ ...prev, ...response }));
         setHasUnparsedFiles(false);
      } catch (err) {
         console.error("Parsing error:", err);
      }
      setIsParsing(false);
   };

   const isDisabled = isParsing || !hasUnparsedFiles || documents.length === 0;
   const atUploadLimit = documents.length >= maxFiles;

   return (
      <div className="w-full max-w-4xl mx-auto px-4 py-4 space-y-6">
         {/* Upload + Parse Row */}
         <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
               onClick={() => !atUploadLimit && fileInputRef.current.click()}
               className={`flex-1 min-w-[220px] h-12 border-2 border-dashed ${
                  atUploadLimit ? "border-gray-300 text-gray-400 cursor-not-allowed" : "border-slate-400 hover:bg-slate-50"
               } rounded-md flex items-center justify-center transition`}
               disabled={atUploadLimit}
            >
               <p className="text-md mr-2">{atUploadLimit ? "Max Uploads Reached" : "Upload Documents"}</p>
               <FiUploadCloud size={20} />
            </button>

            <input
               type="file"
               multiple
               ref={fileInputRef}
               onChange={handleFileChange}
               className="hidden"
            />

            <button
               className={`h-12 w-24 flex items-center justify-center rounded-md transition ${
                  isDisabled
                     ? "bg-slate-300 text-white cursor-not-allowed"
                     : "bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:opacity-90"
               }`}
               onClick={handleParse}
               disabled={isDisabled}
            >
               <p className="text-md">{isParsing ? "Parsing..." : "Parse"}</p>
            </button>
         </div>

         {/* Collapse Toggle */}
         {documents.length > 0 && (
            <button
               onClick={() => setIsExpanded(prev => !prev)}
               className="text-sm text-indigo-600 hover:underline flex items-center gap-1"
            >
               {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
               {isExpanded ? "Hide Uploaded Documents" : "Show Uploaded Documents"}
            </button>
         )}

         {/* Uploaded File List */}
         {isExpanded && documents.length > 0 && (
            <ul className="space-y-3">
               {documents.map((file, idx) => (
                  <li
                     key={idx}
                     className="flex items-center justify-between px-4 py-2 border border-slate-200 bg-slate-50 rounded-md shadow-sm text-sm text-slate-700 cursor-pointer hover:bg-slate-100"
                     onClick={() => window.open(file.blob_url, "_blank")}
                  >
                     <div className="flex items-center gap-3 overflow-hidden">
                        <FiUploadCloud size={16} className="text-slate-500" />
                        <span className="truncate">{file.name || file.file_name}</span>
                     </div>
                     <button
                        onClick={(e) => {
                           e.stopPropagation();
                           handleRemove(idx);
                        }}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Remove file"
                     >
                        <FiTrash size={16} />
                     </button>
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
};

export default FileUploadSection;

"use client";
import { useRef, useState, useContext } from "react";
import { FiUploadCloud, FiFileText, FiTrash2, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FormContext } from "@/app/context/formContext";
import { deleteFiles } from "@/app/services/deleteServices";
import { createBatchFiles } from "@/app/services/createServices";

const DocumentsPage = () => {
   const fileInputRef = useRef();
   const { documents, setDocuments, appealId } = useContext(FormContext);
   const [isExpanded, setIsExpanded] = useState(true);
   const maxFiles = 3;

   const handleFileChange = async (e) => {
      const fileObjects = Array.from(e.target.files);
      if (documents.length + fileObjects.length > maxFiles) return;

      const newDoc = await createBatchFiles(appealId, fileObjects);
      setDocuments(prev => [...newDoc, ...prev]);
   };

   const handleRemove = async (index) => {
      const file = documents[index];
      if (file?.id) {
         try {
            await deleteFiles([file.id]);
         } catch (err) {
            console.error("Failed to delete from server:", err);
            return;
         }
      }
      setDocuments((prev) => prev.filter((_, i) => i !== index));
   };

   const atUploadLimit = documents.length >= maxFiles;

   return (
      <div className="p-10 bg-gradient-to-b from-white via-slate-50 to-slate-100 min-h-screen">
         <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg px-8 py-10 space-y-12">
            {/* Header */}
            <div className="space-y-1">
               <h1 className="text-3xl font-light text-gray-900">Upload Documents</h1>
               <p className="text-sm text-gray-500">
                  Submit medical records, letters, and supporting files for your appeal.
               </p>
            </div>

            {/* Upload Area */}
            <div className="flex items-center gap-4">
               <button
                  onClick={() => !atUploadLimit && fileInputRef.current.click()}
                  className={`w-full sm:w-1/2 px-6 py-4 border-2 border-dashed rounded-md text-sm flex items-center justify-center transition ${
                     atUploadLimit
                        ? "border-gray-300 text-gray-400 cursor-not-allowed"
                        : "border-slate-400 text-slate-600 hover:bg-slate-50"
                  }`}
                  disabled={atUploadLimit}
               >
                  <FiUploadCloud size={20} className="mr-2" />
                  {atUploadLimit ? "Max Uploads Reached" : "Click to Upload Files"}
               </button>
               <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
               />
            </div>

            {/* Uploaded Documents */}
            <div>
               <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Uploaded Files</h2>
                  {documents.length > 0 && (
                     <button
                        onClick={() => setIsExpanded((prev) => !prev)}
                        className="flex items-center text-sm text-indigo-600 hover:underline"
                     >
                        {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                        {isExpanded ? "Hide Files" : "Show Files"}
                     </button>
                  )}
               </div>
               {documents.length === 0 ? (
                  <p className="text-sm text-slate-500 italic">No documents uploaded yet.</p>
               ) : (
                  isExpanded && (
                     <div className="space-y-2">
                        {documents.map((doc, idx) => (
                           <div
                              key={idx}
                              className="flex items-center text-sm text-slate-700 bg-slate-50 p-4 border rounded-md hover:bg-slate-100"
                           >
                              <FiFileText size={18} className="mr-2 text-slate-500" />
                              <span
                                 className="truncate cursor-pointer"
                                 onClick={() => window.open(doc.blob_url, "_blank")}
                              >
                                 {doc.file_name || doc.name}
                              </span>
                              <span className="ml-auto text-xs text-gray-400 mr-4">
                                 {new Date(doc.uploaded_at || doc.uploadedAt).toLocaleDateString()}
                              </span>
                              <button
                                 onClick={() => handleRemove(idx)}
                                 className="text-red-500 hover:text-red-700 transition"
                              >
                                 <FiTrash2 size={16} />
                              </button>
                           </div>
                        ))}
                     </div>
                  )
               )}
            </div>
         </div>
      </div>
   );
};

export default DocumentsPage;

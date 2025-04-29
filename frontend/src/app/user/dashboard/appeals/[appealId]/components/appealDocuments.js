import { IoDocumentTextOutline } from "react-icons/io5";


const AppealDocuments = ({files, isDraft, handleDocumentsAdd}) => {

   return (
      <div className="lg:w-1/4 bg-white rounded-lg shadow-sm">
         <div className="px-6 pt-6 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800">Documents</h2>
         </div>

         <div className="px-6 py-6 space-y-4 text-sm text-gray-600 flex flex-col">

            {isDraft && 
            <button 
               className="px-8 py-3 bg-blue-600 text-white rounded-md"
               onClick={handleDocumentsAdd}
            >
               Add Documents
            </button>}

            {files && files.length > 0 ? (
               files.map((file, index) => (
                  <div 
                     key={index} 
                     className="flex flex-row items-center space-x-2 border border-gray-300 rounded p-3 hover:bg-gray-50 transition cursor-pointer"
                     onClick={() => {
                        const url = file.blob_url
                        window.open(url, "_blank");
                     }}
                  >
                     <IoDocumentTextOutline size={20}/>
                     <p>{file.file_name}</p>
                     {/* Optionally show upload date or file type */}
                  </div>
               ))
            ) : (
               <p>No documents uploaded.</p>
            )}
         </div>
      </div>
   )
}

export default AppealDocuments
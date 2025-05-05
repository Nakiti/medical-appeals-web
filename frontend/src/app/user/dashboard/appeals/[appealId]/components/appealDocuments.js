import { IoDocumentTextOutline } from "react-icons/io5";

const AppealDocuments = ({ files, isDraft, handleDocumentsAdd }) => {
  return (
    <div className="lg:w-1/4 bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Documents</h2>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-4 text-sm text-gray-700">
        {/* Add Documents Button */}
        {isDraft && (
          <button
            className="w-full px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
            onClick={handleDocumentsAdd}
          >
            Add Documents
          </button>
        )}

        {/* File List */}
        {files && files.length > 0 ? (
          files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md transition cursor-pointer"
              onClick={() => window.open(file.blob_url, "_blank")}
            >
              <IoDocumentTextOutline size={22} className="text-blue-600" />
              <p className="text-sm text-gray-800 truncate">{file.file_name}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No documents uploaded.</p>
        )}
      </div>
    </div>
  );
};

export default AppealDocuments;

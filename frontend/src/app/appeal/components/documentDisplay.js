import { FaFileAlt, FaEye, FaTrash } from "react-icons/fa";

const DocumentDisplay = ({ item, handleRemove }) => {
   return (
      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
         {/* Left: Icon + Name */}
         <div className="flex items-center gap-4">
         <div className="p-2 bg-gray-100 rounded-md text-blue-500 text-lg">
            <FaFileAlt />
         </div>
         <div>
            <p className="font-medium text-gray-800">
               {item.file?.name || item.file_name || "Document"}
            </p>
            {item.size && (
               <p className="text-sm text-gray-500">
               {(item.file?.size / 1024).toFixed(1)} KB
               </p>
            )}
         </div>
         </div>

         {/* Right: Action buttons */}
         <div className="flex items-center gap-3 text-gray-600">
         <button
            onClick={() => {
               const url = item.file
               ? URL.createObjectURL(item.file)
               : item.blob_url;
               window.open(url, "_blank");
            }}
            className="hover:text-blue-600 transition"
            title="View"
         >
            <FaEye className="w-4 h-4" />
         </button>
         <button
            onClick={() => handleRemove(item.id)}
            className="hover:text-red-600 transition"
            title="Remove"
         >
            <FaTrash className="w-4 h-4" />
         </button>
         </div>
      </div>
   );
};

export default DocumentDisplay;


const DocumentDisplay = ({item}) => {

   return (
      <div 
      className="flex items-center justify-between p-3 mb-2 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
      >
         <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-md">
               📄
            </div>
            <div>
               <p className="font-medium text-gray-800">{item.file?.name || item.file_name || "Document"}</p>
               {item.size && (
               <p className="text-sm text-gray-500">{(item.file?.size / 1024).toFixed(1)} KB</p>
               )}
            </div>
         </div>
         {/* Optional action icons */}
         <div className="flex gap-2">
            <button 
               className="text-blue-500 hover:underline text-sm" 
               onClick={() => {
                  const url = item.file ? URL.createObjectURL(item.file) : item.blob_url
                  window.open(url, "_blank");
               }}
            >View</button>
            <button 
               className="text-red-500 hover:underline text-sm"
               onClick={() => handleRemove(item.id)}
            >Remove</button>
         </div>
      </div>
   )
}

export default DocumentDisplay
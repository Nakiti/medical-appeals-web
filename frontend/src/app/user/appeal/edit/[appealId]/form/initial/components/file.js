import { FaFileAlt } from "react-icons/fa"
import { IoClose } from "react-icons/io5"

const FileDisplay = ({index, document, blobUrl, setDocuments, isImage}) => {

   const handleDelete = (id) => {
      setDocuments((prev) => prev.filter(item => item.id != id))
   }

   return (
      <div className='w-full flex flex-row border-2 rounded-lg'>
         <a
            key={index}
            href={blobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11/12 flex flex-row items-center overflow-hidden "
         >
            {isImage ? (
               (
                  <div className='flex flex-row space-x-4 items-center'>
                  <img
                     src={document.src}
                     alt={document.file_name || document.name || "Image"}
                     className="w-16 h-16 object-cover rounded-lg"
                  />
                  <p className=''>Image {index + 1}</p>
                  </div>
               )
            ) : (
               <FaFileAlt size={48} />
            )}
            <p className="text-md p-4">{document.file?.file_name || document.file?.name || document.file_name}</p>
         </a>
         <button className='w-1/12 flex justify-center items-center' onClick={() => handleDelete(document.id)}>
            <IoClose size={20}/>
         </button>
      </div>
   )
}

export default FileDisplay
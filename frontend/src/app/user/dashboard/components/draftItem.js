import React from 'react';
import { IoChevronForwardOutline, IoTrashOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

const DraftItem = ({ draft, editing, handleSelect }) => {
   const { id, dateSaved, description } = draft;
   const router = useRouter()

   const handleClick = () => {
      router.push(`/user/appeal/edit/${draft.id}/form/patient-details`)
   }

   return (
      <div 
         onClick={() => editing ? handleSelect(draft.id) : handleClick()} 
         className="bg-white rounded-md p-4 mb-4 shadow-md w-full cursor-pointer"
      >
         {/* Top Section */}
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{draft.internal_name}</h3>
            <div className="flex items-center">
               <span className="text-sm font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                  Draft
               </span>
               <IoChevronForwardOutline size={20} className="text-gray-500 ml-2" />
            </div>
         </div>

         <p className="text-xs text-gray-600 mb-4">
            {description || 'No description provided yet.'}
         </p>

         <div className="border-t border-gray-200 my-4" />
         
         {/* Bottom Section */}
         <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Last Saved: {new Date(draft.updated_at).toLocaleDateString("en-US")}</span>
            {/* Uncomment this section to add action buttons */}
            {/* <div className="flex">
               <button className="flex items-center text-red-500">
                  <IoTrashOutline size={18} />
                  <span className="text-xs ml-2">Discard</span>
               </button>
            </div> */}
         </div>
      </div>
   );
};

export default DraftItem;

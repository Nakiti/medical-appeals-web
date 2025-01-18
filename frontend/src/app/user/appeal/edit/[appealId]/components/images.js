import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const Images = ({ images, setImages }) => {
   const [isEditMode, setIsEditMode] = useState(false);

   const toggleEditMode = () => {
      setIsEditMode(!isEditMode);
   };

   const handleSelect = (id) => {
      setImages((prev) => 
         prev.map((item) =>
            item.id === id ? { ...item, selected: !item.selected } : item
         )      
      )
   }

   const handleDelete = () => {
      setImages((prev) => prev.filter(item => item.selected == true))
   }

   return (
      <div>
         <div className="grid grid-cols-3 gap-1 p-1">
         {images.map((image, index) => (
            <div key={index} className="relative w-full aspect-square overflow-hidden">
               <img
                  src={image.src}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover"
               />
               {isEditMode && (
               <div className="absolute bottom-2 right-2">
                  <input
                     type="checkbox"
                     id={`image-checkbox-${index}`}
                     className="w-5 h-5 border-2 border-gray-300 rounded-full"
                     onChange={() => handleSelect(image.id)}
                  />
               </div>
               )}
            </div>
         ))}
         </div>
         <div className="absolute bottom-0 w-full flex justify-between px-8 py-4 bg-gray-800 text-white">
            {isEditMode ? <button onClick={handleDelete}>
               <FaTrash size={20} className='text-red'/>
            </button> : <div></div>}
            <button
               onClick={toggleEditMode}
               className="px-4 py-2 text-blue-500 text-xl self-end rounded-full"
            >
               {isEditMode ? 'Done' : 'Edit'}
            </button>
         </div>
      </div>
   );
};

export default Images;

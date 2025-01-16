import React, { useState } from 'react';
import { createAppeal } from '@/app/services/createServices';
import { useRouter } from 'next/navigation';

const Modal = ({ visible, setVisible, userId }) => {
   const [selectedType, setSelectedType] = useState('Claim');
   const [appealName, setAppealName] = useState('');
   const appealTypes = ['Claim', 'Preauth'];
   const router = useRouter()

   const handleCreate = async () => {
      const appealId = await createAppeal(userId, appealName);
      router.push(`/user/appeal/edit/${appealId}/initial`)
   };

   if (!visible) return null;

   return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
         <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 md:w-1/2">
         {/* Header */}
         <div className="bg-blue-500 text-white flex justify-between items-center px-5 py-3">
            <h2 className="text-lg font-bold">Start New Appeal</h2>
            <button onClick={() => setVisible(false)} className="focus:outline-none">
               <span className="text-white font-bold text-xl">&times;</span>
            </button>
         </div>

         {/* Top Navigation */}
         <div className="border-b border-gray-200 flex">
            {appealTypes.map((type, index) => (
               <button
               key={index}
               onClick={() => setSelectedType(type)}
               className={`flex-1 py-3 text-center ${
                  selectedType === type ? 'border-b-2 border-blue-500 font-semibold' : ''
               }`}
               >
               {type}
               </button>
            ))}
         </div>

         {/* Content */}
         <div className="p-6">
            <h3 className="text-2xl font-bold mb-4">{selectedType}</h3>
            <p className="text-gray-600 mb-6">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="mb-4">
               <label htmlFor="appealName" className="block text-sm font-medium text-gray-700 mb-1">
               Appeal Name
               </label>
               <input
               id="appealName"
               type="text"
               className="border border-gray-300 rounded-md px-4 py-2 w-full"
               placeholder="Enter Appeal Name"
               value={appealName}
               onChange={(e) => setAppealName(e.target.value)}
               />
            </div>
            <div className="flex justify-center">
               <button
               onClick={handleCreate}
               className="bg-blue-500 text-white py-2 px-4 rounded-md w-1/4"
               >
               Start
               </button>
            </div>
         </div>
         </div>
      </div>
   );
};

export default Modal;



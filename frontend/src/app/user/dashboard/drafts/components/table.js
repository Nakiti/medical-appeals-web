

import React from 'react';
import { useRouter } from 'next/navigation';

const Table = ({ data, userId, isEditing, handleSelect }) => {
   const router = useRouter()

   const handleClick = (id) => {
      router.push(`/user/appeal/edit/${id}/form/patient-details`)
   }

   return (
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
         <table className="min-w-full divide-y divide-gray-200 bg-white text-sm text-left">
            <thead className="bg-gray-50">
               <tr>
                  {isEditing && (
                     <th className="px-4 py-3 font-semibold text-gray-600"></th>
                  )}
                  <th className="px-4 py-3 font-semibold text-gray-600">ID</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Claim Number</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Date Created</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
               {data.map((item, index) => (
                  <tr
                     key={index}
                     className="hover:bg-gray-50 transition-colors"
                     onClick={() =>
                        isEditing ? handleSelect(item.id) : handleClick(item.id)
                     }
                  >
                     {isEditing && (
                        <td className="px-4 py-3">
                           <input type="checkbox" value={item.selected} />
                        </td>
                     )}
                     <td className="px-4 py-3">{item.id}</td>
                     <td className="px-4 py-3">{item.claim_number || "-"}</td>
                     <td className="px-4 py-3">
                        {new Date(item.created_at).toLocaleDateString("en-US")}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );   
};

export default Table;

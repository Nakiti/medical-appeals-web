

import React from 'react';
import { useRouter } from 'next/navigation';

const Table = ({ data, userId, isEditing, handleSelect }) => {
   const router = useRouter()

   const handleClick = (id) => {
      router.push(`/user/appeal/edit/${id}/form/patient-details`)
   }

   return (
      <div className="overflow-x-auto">
         <table className="min-w-full bg-white">
            <thead className='border-b border-gray-600'>
               <tr>
                  {isEditing && <th className="text-left py-3 px-4 font-medium text-gray-700"></th>}
                  <th className="text-left py-3 px-4 font-medium text-gray-700">id</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Internal Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Claim Number</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date Created</th>
               </tr>
            </thead>
            <tbody>
               {data.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200 text-sm hover:bg-gray-100 cursor-pointer" onClick={() => isEditing ? handleSelect(item.id) : handleClick(item.id)}>
                     {isEditing && <td className="py-3 px-4 flex justify-center items-center">
                        <input type='checkbox' value={item.selected}></input>
                     </td>}
                     <td className="py-3 px-4">{item.id}</td>
                     <td className="py-3 px-4">
                        <p className="">{item.internal_name}</p>
                     </td>
                     <td className="py-3 px-4">{item.claim_number || "-"}</td>
                     <td className="py-3 px-4">{new Date(item.created_at).toLocaleDateString("en-US")}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default Table;

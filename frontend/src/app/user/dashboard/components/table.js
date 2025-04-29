import React from "react";
import { useRouter } from "next/navigation";

const Table = ({ data, columns, onRowClick, isEditing = false, handleSelect = null }) => {
   const router = useRouter()

   const handleClick = (id) => {
      router.push(`/user/dashboard/appeals/${id}`);
   };

   return (
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
         <table className="min-w-full divide-y divide-gray-200 bg-white text-sm text-left">
            <thead className="bg-gray-50">
               <tr>
                  {isEditing && (
                     <th className="px-4 py-3 font-semibold text-gray-600"></th>
                  )}
                  {columns.map((col, index) => (
                     <th key={index} className="px-4 py-3 font-semibold text-gray-600 text-center">
                        {col.header}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
               {data.map((item, index) => (
                  <tr
                     key={index}
                     onClick={() => handleClick(item.id)}
                     className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                     {isEditing && (
                        <td className="px-4 py-3">
                           <input type="checkbox" value={item.selected} />
                        </td>
                     )}
                     {columns.map((col, colIndex) => (
                        <td key={colIndex} className="px-4 py-3 text-gray-700 text-center">
                           {col.render ? col.render(item) : item[col.accessor]}
                        </td>
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default Table;

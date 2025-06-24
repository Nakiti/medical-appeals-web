import React from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { SidebarContext } from "@/app/context/sidebarContext";

const Table = ({ data, columns, onRowClick, isEditing = false, handleSelect = null }) => {
   const router = useRouter();
   const {setIsSidebarOpen} = useContext(SidebarContext)

   const handleClick = (id) => {
      router.push(`/user/dashboard/appeals/${id}/details/patient`);
      setIsSidebarOpen(false)
   };

   return (
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md bg-white">
         <table className="min-w-full text-sm text-left text-gray-700">
         <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
               {isEditing && (
               <th className="px-4 py-3 font-medium text-gray-600 text-center w-10"></th>
               )}
               {columns.map((col, index) => (
               <th
                  key={index}
                  className="px-4 py-3 font-semibold text-gray-600 text-center uppercase text-xs tracking-wide"
               >
                  {col.header}
               </th>
               ))}
            </tr>
         </thead>

         <tbody>
            {data.map((item, index) => (
               <tr
               key={index}
               onClick={() => handleClick(item.id)}
               className="hover:bg-indigo-50 cursor-pointer transition-colors"
               >
               {isEditing && (
                  <td className="px-4 py-3 text-center">
                     <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={(e) => {
                           e.stopPropagation(); // Prevents row click
                           handleSelect?.(item.id);
                        }}
                     />
                  </td>
               )}
               {columns.map((col, colIndex) => (
                  <td
                     key={colIndex}
                     className="px-4 py-3 text-center text-sm text-gray-800"
                  >
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

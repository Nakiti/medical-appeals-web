import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarContext } from "@/app/context/sidebarContext";

const ITEMS_PER_PAGE = 15;

const Table = ({ data, columns, onRowClick, isEditing = false, handleSelect = null }) => {
   const router = useRouter();
   const { setIsSidebarOpen } = useContext(SidebarContext);
   const [currentPage, setCurrentPage] = useState(1);

   const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
   const paginatedData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

   const handleClick = (id) => {
      router.push(`/user/dashboard/appeals/${id}/details/patient`);
      setIsSidebarOpen(false);
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
               {paginatedData.map((item, index) => (
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
                                 e.stopPropagation();
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
         
         {!data || data.length == 0 && <p className="text-md text-center text-gray-700 my-24">No Appeals Found</p>}

         {/* Pagination Controls */}
         <div className="flex justify-center items-center gap-2 py-4">
            <button
               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
               disabled={currentPage === 1}
               className="px-3 py-1 text-sm rounded-md bg-slate-100 hover:bg-slate-200 disabled:opacity-50"
            >
               Previous
            </button>
            <span className="text-sm text-slate-600">
               Page {currentPage} of {totalPages}
            </span>
            <button
               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
               disabled={currentPage === totalPages}
               className="px-3 py-1 text-sm rounded-md bg-slate-100 hover:bg-slate-200 disabled:opacity-50"
            >
               Next
            </button>
         </div>
      </div>
   );
};

export default Table;

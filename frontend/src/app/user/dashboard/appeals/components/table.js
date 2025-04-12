import React from "react";
import { useRouter } from "next/navigation";

const Table = ({ data }) => {
   const router = useRouter();

   const handleClick = (id) => {
      router.push(`/user/dashboard/appeals/${id}`);
   };

   return (
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
         <table className="min-w-full divide-y divide-gray-200 bg-white text-sm text-left">
            <thead className="bg-gray-50">
               <tr>
                  <th className="px-4 py-3 font-semibold text-gray-600">ID</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Claim Number</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Date Filed</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
               {data.map((item, index) => (
                  <tr
                     key={index}
                     onClick={() => handleClick(item.id)}
                     className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                     <td className="px-4 py-3 text-gray-700">{item.id}</td>
                     <td className="px-4 py-3 text-gray-700">{item.claim_number}</td>
                     <td className="px-4 py-3">
                        <span
                           className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                              item.status === "Approved"
                                 ? "bg-green-100 text-green-700"
                                 : item.status === "Submitted"
                                 ? "bg-blue-100 text-blue-600"
                                 : item.status === "Under Review"
                                 ? "bg-yellow-100 text-yellow-700"
                                 : "bg-red-100 text-red-700"
                           }`}
                        >
                           {item.status}
                        </span>
                     </td>
                     <td className="px-4 py-3 text-gray-700">
                        {new Date(item.date_filed).toLocaleDateString("en-US")}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default Table;

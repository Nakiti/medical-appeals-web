import React from 'react';
import { useRouter } from 'next/navigation';

const Table = ({ data }) => {
   const router = useRouter();

   const handleClick = (id) => {
      router.push(`/user/dashboard/appeals/${id}`);
   };

   return (
      <div className="overflow-x-auto">
         <table className="min-w-full bg-white">
            <thead className='border-b border-gray-600'>
               <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Id</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Internal Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Claim Number</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date Filed</th>
               </tr>
            </thead>
            <tbody>
               {data.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200 text-sm hover:bg-gray-100 cursor-pointer" onClick={() => handleClick(item.id)}>
                     <td className="py-3 px-4">
                        <p className="">{item.id}</p>
                     </td>
                     <td className="py-3 px-4">
                        <p className="">{item.internal_name}</p>
                     </td>
                     <td className="py-3 px-4">{item.claim_number}</td>
                     <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-sm rounded-sm ${
                           item.status === 'Approved'
                              ? 'bg-green-100 text-green-700'
                              : item.status === 'Submitted'
                              ? 'bg-blue-100 text-blue-700'
                              : item.status === 'Under Review'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                        }`}>
                           {item.status}
                        </span>
                     </td>
                     <td className="py-3 px-4">{new Date(item.date_filed).toLocaleDateString("en-US")}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default Table;

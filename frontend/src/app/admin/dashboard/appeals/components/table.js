import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Table = ({ data }) => {
   const router = useRouter();
   const [currentPage, setCurrentPage] = useState(1); // creates pagination of campaigns table
   const rowsPerPage = 10; 
   const indexOfLastRow = currentPage * rowsPerPage;
   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
   const currentRows = data && data.slice(indexOfFirstRow, indexOfLastRow);
   const totalPages = data && data.length > 0 ? Math.ceil(data && data.length / rowsPerPage) : 1;

   const handlePreviousPage = () => {
      if (currentPage > 1) {
         setCurrentPage(currentPage - 1);
      }
   };

   const handleNextPage = () => {
      if (currentPage < totalPages) {
         setCurrentPage(currentPage + 1);
      }
   };

   const handleClick = (id) => {
      router.push(`/admin/dashboard/appeals/${id}`);
   };

   return (
      <div className="overflow-x-auto">
         <table className="min-w-full bg-white">
            <thead className='border-b border-gray-600'>
               <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Id</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Patient Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Internal Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Claim Number</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Date Filed</th>
               </tr>
            </thead>
            {currentRows && currentRows.length > 0 && <tbody>
               {currentRows.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200 text-sm hover:bg-gray-100 cursor-pointer" onClick={() => handleClick(item.id)}>
                     <td className="py-3 px-4">
                        <p className="">{item.id}</p>
                     </td>
                     <td className="py-3 px-4">
                        <p className="">{item.first_name} {item.last_name}</p>
                     </td>
                     <td className="py-3 px-4">
                        <a href="#" className="text-blue-600 hover:underline">{item.internal_name}</a>
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
            </tbody>}
         </table>
         {currentRows && currentRows.length == 0 && <p className="text-gray-700 text-center mx-auto p-4 ">No Matching Appeals</p>}
         <div className="flex justify-between items-center my-2 pb-4 text-gray-600 text-sm w-1/2 mx-auto">
            <button
               className="flex items-center px-3 py-2 rounded-full hover:bg-gray-200 transition-colors"
               onClick={handlePreviousPage}
            >
               <FaAngleLeft />
               <span className="ml-1">Previous</span>
            </button>
            <p>Page {currentPage} / {totalPages}</p>
            <button
               className="flex items-center px-3 py-2 rounded-full hover:bg-gray-200 transition-colors"
               onClick={handleNextPage}
            >
               <span className="mr-1">Next</span>
               <FaAngleRight />
            </button>
         </div>
      </div>
   );
};

export default Table;

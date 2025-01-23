import { useRouter } from "next/navigation";

const Table = ({ columns, data, type }) => {
   const router = useRouter()

   const handleClick = (id) => {
      if (type == "draft") {
         router.push(`/user/appeal/edit/${id}/form/patient-details`)
      } else {
         router.push(`/user/dashboard/appeals/${id}`)
      }
   }

   return (
      <div className="overflow-x-auto">
         <table className="min-w-full rounded-md">
            <thead className="border-b">
               <tr>
                  {columns.map((column, colIndex) => (
                     <th
                        key={colIndex}
                        className="text-left px-6 py-2 text-sm font-semibold text-gray-700"
                     >
                        {column.title}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {data && data.length > 0 ? (
                  data.slice(0, 5).map((item, rowIndex) => (
                     <tr
                        key={rowIndex}
                        className={`hover:bg-gray-50 cursor-pointer`}
                        onClick={() => handleClick(item.id)}
                     >
                        {columns.map((column, colIndex) => (
                           <td
                              key={colIndex}
                              className="px-6 py-2 text-sm text-gray-600"
                           >
                              {item[column.value] || "-"}
                           </td>
                        ))}
                     </tr>
                  ))
               ) : (
                  <tr>
                     <td
                        colSpan={columns.length}
                        className="px-6 py-4 text-center text-sm text-gray-500"
                     >
                        No data available.
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
   );
};

export default Table;

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { SidebarContext } from "@/app/context/sidebarContext";

const Table = ({ columns, data, type }) => {
   const router = useRouter()
   const {setIsSidebarOpen} = useContext(SidebarContext)

   const handleClick = (id) => {
      router.push(`/user/dashboard/appeals/${id}/details/patient`)
      setIsSidebarOpen(false)
   }

   const formatDate = (dateString) => {
      try {
         const date = new Date(dateString);
         if (isNaN(date)) throw new Error("Invalid Date");
         return date.toLocaleDateString("en-US");
      } catch {
         return "-"; // Fallback for invalid dates
      }
   };

   const getStatusClasses = (status) => {
      console.log(status)

      switch (status.toLowerCase()) {
         case "":
            return "bg-blue-100 text-blue-800";
         case "approved":
            return "bg-green-100 text-green-800";
         case "denied":
            return "bg-red-100 text-red-800";
         case "submitted":
            return "bg-green-100 text-green-800";
         default:
            return "bg-gray-100 text-gray-700";
      }
   };

   return (
      <div className="overflow-x-auto">
         <table className="min-w-full rounded-md">
            <thead className="border-b">
               <tr>
                  {columns.map((column, colIndex) => (
                     <th
                        key={colIndex}
                        className="text-center px-6 py-2 text-sm font-semibold text-gray-700"
                     >
                        {column.title}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {data && data.length > 0 ? (
                  data.slice(0, 10).map((item, rowIndex) => (
                     <tr
                        key={rowIndex}
                        className={`hover:bg-gray-50 cursor-pointer`}
                        onClick={() => handleClick(item.id)}
                     >
                        {columns.map((column, colIndex) => (
                           <td
                              key={colIndex}
                              className={`px-6 py-2 text-sm text-gray-600 `}
                           >
                              <p className={`text-center p-1 rounded-lg ${column.value == "status" && getStatusClasses(item.status)}`}>
                                 {column.value === "date_filed" || column.value === "created_at" || column.value == "appeal_deadline"
                                    ? formatDate(item[column.value])
                                    : item[column.value] || "-"}
                              </p>
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
                        No Appeals
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
   );
};

export default Table;

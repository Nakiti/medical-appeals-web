import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getAppeal } from "@/app/services/fetchServices";

const HeaderBar = ({appealId, links, back}) => {
   const pathname = usePathname();
   const router = useRouter();
   const [appeal, setAppeal] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await getAppeal(appealId);
            setAppeal(response);
         } catch (err) {
            console.log(err);
         }
      };

      fetchData();
   }, [appealId]);

   return (
      <div className="border-b px-8 pt-6">
         {appeal && (
            <div>
               {/* Appeal Info Section */}
               <div className="flex justify-between items-center w-full pb-4 mb-4">
                  <div>
                     <div className="mb-3">
                        <Link href={back}>
                           <FaArrowLeft size={16} className="text-gray-600 hover:text-blue-600 transition-all duration-200" />
                        </Link>
                     </div>
                     <h1 className="text-3xl font-semibold text-gray-800">{appeal.internal_name}</h1>
                     <p className="text-sm text-gray-500">{appeal.submitted ? `Filed: ${appeal.dated_filed}` : `Created On: ${new Date(appeal.created_at).toLocaleDateString("en-US")}`}</p>
                  </div>

                  {appeal.submitted? <span
                     className={`text-sm py-2 px-4 rounded-full ${
                        appeal.status === "Approved"
                           ? "bg-green-100 text-green-700"
                           : appeal.status === "Submitted"
                           ? "bg-blue-100 text-blue-700"
                           : appeal.status === "Under Review"
                           ? "bg-yellow-100 text-yellow-700"
                           : "bg-red-100 text-red-700"
                     }`}
                  >
                     {appeal.status}
                  </span> : <p className="text-sm py-2 px-4 rounded-full bg-blue-100 text-blue-700">Draft</p>}
               </div>

               {/* Navigation Links */}
               <div className="flex space-x-6">
                  {links.map((item, index) => (
                     <Link
                        key={index}
                        href={item.pathName}
                        className={`px-4 py-2 text-md font-medium border-b-4 ${
                           pathname === item.pathName
                              ? "border-blue-500 text-blue-600"
                              : "border-transparent text-gray-600"
                        } hover:border-blue-500 hover:text-blue-600 transition-all duration-200 ease-in-out`}
                     >
                        {item.title}
                     </Link>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
};

export default HeaderBar;

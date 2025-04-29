import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getAppeal } from "@/app/services/fetchServices";

const HeaderBar = ({ appealId, links, back }) => {
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
      <div className="bg-gray-800 px-8 pt-8 border-b shadow text-white">
         {appeal && (
            <div className="space-y-10">
               {/* Top Row: Back + Title + Edit */}
               <div className="flex flex-wrap justify-between items-center">
                  <div className="flex items-start gap-4">
                     <Link
                        href={back}
                        className="text-gray-300 hover:text-indigo-500 transition-colors pt-1"
                     >
                        <FaArrowLeft size={18} />
                     </Link>
                     <div>
                        <h1 className="text-2xl font-semibold text-white flex items-center gap-3">
                           Claim #: {appeal.claim_number}
                           {appeal.submitted === 0 && (
                              <div>
                                 <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
                                    Draft
                                 </span>
                                 <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                                    Appeal Deadline: {new Date(appeal.appeal_deadline).toLocaleDateString("en-US")}
                                 </span>
                              </div>
                           )}
                        </h1>
                        <p className="text-sm text-gray-300 mt-1">
                           {appeal.submitted === 1
                              ? `Filed: ${new Date(appeal.date_filed).toLocaleDateString("en-US")}`
                              : `Created: ${new Date(appeal.created_at).toLocaleDateString("en-US")}`}
                        </p>
                     </div>
                  </div>

                  {appeal.submitted === 0 && (
                     <button
                        onClick={() =>
                           router.push(`/appeal/${appeal.id}/patient-details`)
                        }
                        className="mt-4 sm:mt-0 px-10 py-2 text-md font-medium text-white bg-blue-600 rounded-md hover:bg-indigo-600 transition"
                     >
                        Edit
                     </button>
                  )}
               </div>

               {/* Tab Nav */}
               <div className="flex gap-6 ml-1 sm:ml-8">
                  {links.map((item, index) => {
                     const isActive = pathname === item.pathName;
                     return (
                        <Link
                           key={index}
                           href={item.pathName}
                           className={`pb-2 px-2 sm:px-4 text-sm font-semibold transition-all duration-200 ${
                              isActive
                                 ? "text-blue-400 border-b-2 border-blue-400"
                                 : "text-gray-300 hover:text-indigo-400 hover:border-b-2 hover:border-indigo-400"
                           }`}
                        >
                           {item.title}
                        </Link>
                     );
                  })}
               </div>
            </div>
         )}
      </div>
   );
};

export default HeaderBar;

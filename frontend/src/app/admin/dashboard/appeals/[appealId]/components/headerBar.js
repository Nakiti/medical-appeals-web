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
      <div className="bg-white shadow-sm px-8 pt-6 border-b">
         {appeal && (
            <div>
               {/* Appeal Info Section */}
               <div className="flex justify-between items-center pb-2">
                  <div>
                     <div className="flex items-center mb-2">
                        <Link href={back}>
                           <FaArrowLeft
                              size={20}
                              className="text-gray-500 hover:text-blue-600 transition-all duration-200 cursor-pointer"
                           />
                        </Link>
                        <span className="ml-4 text-xl font-medium text-gray-700">{appeal.internal_name}</span>
                     </div>
                     <p className="text-sm text-gray-500">
                        {appeal.submitted
                           ? `Filed: ${new Date(appeal.date_filed).toLocaleDateString("en-US")}`
                           : `Created On: ${new Date(appeal.created_at).toLocaleDateString("en-US")}`}
                     </p>
                  </div>
                  <div>
                     {appeal.submitted ? (
                        <span
                           className={`text-sm font-semibold py-2 px-4 rounded-full ${
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
                        </span>
                     ) : (
                        <p className="text-sm font-semibold py-2 px-4 rounded-full bg-blue-100 text-blue-700">
                           Draft
                        </p>
                     )}
                  </div>
               </div>

               {/* Navigation Links */}
               <div className="flex space-x-6 mt-4">
                  {links.map((item, index) => (
                     <Link
                        key={index}
                        href={item.pathName}
                        className={`px-4 py-1 text-sm font-semibold border-b-2 ${
                           pathname === item.pathName
                              ? "border-blue-600 text-blue-600"
                              : "border-transparent text-gray-600"
                        } hover:border-blue-600 hover:text-blue-600 transition-all duration-200`}
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

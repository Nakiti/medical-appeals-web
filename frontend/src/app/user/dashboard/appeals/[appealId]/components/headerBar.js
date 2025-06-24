import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState, useContext } from "react";
import { getAppeal } from "@/app/services/fetchServices";
import { FormContext } from "@/app/context/formContext";
import { SidebarContext } from "@/app/context/sidebarContext";

const steps = ["Create Appeal", "Submitted", "In Review", "Decision Made"];

const HeaderBar = ({ appealId, links, back }) => {
   const pathname = usePathname();
   const router = useRouter();
   const [appeal, setAppeal] = useState(null);
   const {status, progress} = useContext(FormContext)
   const {setIsSidebarOpen} = useContext(SidebarContext)

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

   const currentStepIndex = () => {
      if (progress == "Submitted") return 1;
      if (progress == "In Review") return 2;
      if (progress == "Decision Made") return 3;
      return 0;
   };

   const handleBack = () => {
      router.push(back)
      // setIsSidebarOpen(true)
   }

   return (
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white px-4 sm:px-6 pt-6 pb-1 border-b border-slate-600 shadow">
         {appeal && (
            <div className="max-w-7xl mx-auto space-y-6">
               {/* Info Row */}
               <div className="flex flex-col sm:flex-row justify-between gap-6">
                  <div className="flex items-start gap-4">
                     <div
                        className="pt-1 text-white/70 hover:text-white transition"
                        onClick={handleBack}
                     >
                        <FaArrowLeft size={18} />
                     </div>
                     <div>
                        <h1 className="text-2xl font-semibold flex flex-wrap items-center gap-3">
                           Claim #: {appeal.claim_number}
                           {status == "draft" && (
                              <div>
                                 <span className="bg-yellow-200 text-yellow-900 text-xs font-semibold px-2 py-1 rounded mr-2">
                                    Draft
                                 </span>
                                 <span className="bg-red-200 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                                    Appeal Deadline:{" "}
                                    {new Date(appeal.appeal_deadline).toLocaleDateString("en-US")}
                                 </span>
                              </div>
                           )}
                        </h1>
                        <p className="text-sm text-slate-300 mt-1">
                           {status == "submitted"
                              ? `Filed: ${new Date(appeal.date_filed).toLocaleDateString("en-US")}`
                              : `Created: ${new Date(appeal.created_at).toLocaleDateString("en-US")}`}
                        </p>
                     </div>
                  </div>

                  {/* Actions */}
                  {status == "draft" && (
                     <div className="flex flex-wrap gap-3 items-center">
                        <button
                           onClick={() => router.push(`/appeal/${appeal.id}/patient-details`)}
                           className="px-5 py-1.5 text-sm font-medium bg-slate-600 hover:bg-slate-500 rounded-full transition"
                        >
                           Edit In Form
                        </button>
                        <button
                           className="px-5 py-1.5 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 rounded-full transition"
                        >
                           Submit
                        </button>
                     </div>
                  )}
               </div>

               {/* Progress Bar */}
               <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 ml-8">
                  {steps.map((step, index) => (
                     <div key={step} className="flex items-center gap-2">
                        <div
                           className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-[11px] font-semibold ${
                              currentStepIndex() >= index
                                 ? "bg-indigo-500"
                                 : "border border-slate-400 text-slate-400"
                           }`}
                        >
                           {index + 1}
                        </div>
                        <span className={currentStepIndex() >= index ? "text-white font-medium" : ""}>
                           {step}
                        </span>
                        {index < steps.length - 1 && <div className="w-5 h-px bg-slate-500" />}
                     </div>
                  ))}
               </div>

               {/* Tab Links */}
               <div className="flex flex-wrap gap-6 pl-1 pt-3 overflow-x-auto border-t border-slate-600">
                  {links.map((item, index) => {
                     const isActive = pathname === item.pathName;
                     return (
                        <Link
                           key={index}
                           href={item.pathName}
                           className={`pb-2 px-2 sm:px-4 text-sm font-medium whitespace-nowrap transition ${
                              isActive
                                 ? "text-white border-b-2 border-white"
                                 : "text-slate-300 hover:text-white hover:border-b-2 hover:border-white/60"
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

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import { ArrowLeft, CalendarDays, FilePenLine, Send, CheckCircle2, CircleDot, Circle } from 'lucide-react';
import { getAppeal } from "@/app/services/fetchServices";
import { FormContext } from "@/app/context/formContext";
import { SidebarContext } from "@/app/context/sidebarContext";
import { updateAppeal, updateAppealComplete } from "@/app/services/updateServices";

const steps = ["Create Appeal", "Submitted", "In Review", "Decision Made"];

// A more visually appealing status badge component
const StatusBadge = ({ status, appeal }) => {
   if (status === "draft") {
      return (
         <div className="flex items-center gap-4">
         <span className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-1 rounded-full">
            <Circle className="w-3 h-3" />
            Draft
         </span>
         <span className="inline-flex items-center gap-1.5 text-red-400 text-xs font-medium">
            <CalendarDays className="w-3.5 h-3.5" />
            Appeal Deadline: {new Date(appeal.appeal_deadline).toLocaleDateString("en-US")}
         </span>
         </div>
      );
   }

   // Add more statuses here as needed (e.g., approved, denied)
   return (
      <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
         <CircleDot className="w-3 h-3" />
         {status}
      </span>
   );
};


// A cleaner, more intuitive progress bar
const ProgressBar = ({ currentStep }) => {
   const currentStepIndex = steps.indexOf(currentStep);

   return (
      <div className="w-full">
         <div className="flex items-center justify-between">
               {steps.map((step, index) => {
                  const isCompleted = currentStepIndex >= index;
                  const isCurrent = currentStepIndex === index;
                  return (
                     <React.Fragment key={step}>
                           <div className="flex flex-col items-center text-center">
                              <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${isCompleted ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-700 border-slate-500 text-slate-400'}`}>
                                 {isCompleted ? <CheckCircle2 size={16} /> : <span className="font-bold text-sm">{index + 1}</span>}
                              </div>
                              <p className={`mt-2 text-xs font-medium ${isCompleted ? 'text-white' : 'text-slate-400'}`}>{step}</p>
                           </div>
                           {index < steps.length - 1 && (
                              <div className={`flex-1 h-1 mx-2 rounded ${isCompleted ? 'bg-indigo-600' : 'bg-slate-600'}`}></div>
                           )}
                     </React.Fragment>
                  );
               })}
         </div>
      </div>
   );
};


const HeaderBar = ({ appealId = "123", links = [], back = "/" }) => {
   const pathname = usePathname();
   const router = useRouter();
   const [appeal, setAppeal] = useState(null);
   const { status, progress } = useContext(FormContext);
   const { setIsSidebarOpen } = useContext(SidebarContext);

   useEffect(() => {
      if (!appealId) return;
      const fetchData = async () => {
         try {
         const response = await getAppeal(appealId);
         setAppeal(response);
         } catch (err) {
         console.error("Failed to fetch appeal:", err);
         }
      };

      fetchData();
   }, [appealId]);

   const handleComplete = async() => {
      await updateAppealComplete(appealId)
      location.reload()
   }

   if (!appeal) {
      // Optional: Show a loading skeleton
      return <div className="bg-slate-900 h-[220px] animate-pulse"></div>;
   }

   return (
      <div className="bg-slate-900 text-white border-b border-slate-700 shadow-lg">
         {appeal && <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
            {/* Top Row: Info and Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
               <div className="flex items-start gap-4">
                  <button onClick={() => router.push(back)} className="mt-1.5 p-1.5 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                  <ArrowLeft size={20} />
                  </button>
                  <div>
                  <h1 className="text-2xl font-bold text-white">
                     Claim #: {appeal.claim_number}
                  </h1>
                  <p className="text-sm text-slate-400 mt-1">
                     {status === "submitted"
                        ? `Filed: ${new Date(appeal.date_filed).toLocaleDateString("en-US")}`
                        : `Created: ${new Date(appeal.created_at).toLocaleDateString("en-US")}`}
                  </p>
                  <div className="mt-3">
                        <StatusBadge status={status} appeal={appeal} />
                  </div>
                  </div>
               </div>

               {status === "draft" && (
                  <div className="flex flex-shrink-0 gap-3 self-start md:self-center">
                     <button
                        onClick={() => router.push(`/appeal/${appeal.id}/patient-details`)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold bg-slate-700 text-white hover:bg-slate-600 rounded-md transition-colors"
                     >
                        <FilePenLine size={16} />
                        Guided Form
                     </button>
                     <button 
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-500 rounded-md transition-colors shadow-md"
                        onClick={handleComplete}
                        type="submit"
                     >
                        <CheckCircle2 size={16} />
                        Mark Completed
                     </button>
                  </div>
               )}
            </div>

            {/* Progress Bar Section */}
            {/* {status !== "draft" && (
               <div className="px-0 md:px-8">
                  <ProgressBar currentStep={progress} />
               </div>
            )} */}
         </div>}

         {/* Tab Navigation */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800">
         <div className="flex items-center gap-4 -mb-px overflow-x-auto">
               {links.map((item) => {
                  const isActive = pathname === item.pathName;
                  return (
                     <Link
                           key={item.title}
                           href={item.pathName}
                           className={`py-3 px-2 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${
                           isActive
                              ? "text-white border-indigo-500"
                              : "text-slate-400 border-transparent hover:text-white hover:border-slate-400"
                           }`}
                     >
                           {item.title}
                     </Link>
                  );
               })}
         </div>
         </div>
      </div>
   );
};

export default HeaderBar;
